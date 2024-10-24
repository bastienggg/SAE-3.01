<?php
require_once "Controller.php";
require_once "Repository/UserRepository.php" ;




class UserController extends Controller {

    private UserRepository $users;

    public function __construct(){
        $this->users = new UserRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id){
            // URI is .../categories/{id}
            $p = $this->users->find($id);
            return $p==null ? false :  $p;
        }
        else{
            // URI is .../categories
            $cat = $request->getParam("user"); 
            if ( $cat == false) // Si on ne demande pas une catégorie en particulier, on retourne toutes les catégories
                return $this->users->findAll();

        }
    }

    //decode la requête post 
    protected function processPostRequest(HttpRequest $request) {
        $idaction = $request->getId();
        if ($idaction == "signup"){
            return $this->processSignUpRequest($request);
        }

        if ($idaction == "signin"){
            return $this->ProcessSignInRequest($request);
        }
        if ($idaction == "signout" ) {
            return $this->ProcessSignout($request);
        }
    }

    private function processSignUpRequest(HttpRequest $request){
        $email = $request->getParam("email");
        $password = $request->getParam("password");
        
        $user = $this->users->findByEmail($email);
        if ($user != null) return false;

        $hash_password = password_hash($password, PASSWORD_DEFAULT);

        $userdata = [];
        $userdata["email"] = $email;
        $userdata["password"] = $hash_password;
        $userdata["nom"] = $request->getParam("nom");
        $userdata["prenom"] = $request->getParam("prenom");
        $user = new User(0);
        $user->setEmail($userdata["email"]);
        $user->setPassword($userdata["password"]);
        $user->setNom($userdata["nom"]);
        $user->setPrenom($userdata["prenom"]);
        return $this->users->save($user);
    }

    public function processSignInRequest(HttpRequest $request){
        $email = $request->getParam("email");
        $password = $request->getParam("password");

        $user = $this->users->findByEmail($email);
        
        if ($user == null) return false;

        if (password_verify($password, $user->getPassword())){
            session_regenerate_id();
            $_SESSION['user'] = $user;
            echo json_encode($_SESSION);
            return $user; //si le mot de passe est correct, on retourne l'utilisateur 
            
            
        }
        return false;
    }

    private function processSignOut(HttpRequest $request){
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        return true;
    }

}
   


?>





