<?php

session_start();
$cmd = $_REQUEST["cmd"];

if($cmd == "validarTokenSesion"){

    $sURL="https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
    // $sURL="https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
    $sPD = '{
        "idAplicacion": 115,
        "secret":"Lzf4aCzo1OLN9SwcMqvoNE1zKeiDJcRQAeNvgWexRtAIjEsKO6Yq63GpOMYO3aypwdHhkvA1cfd75PxYll2n2I5VPTEXp0gnTKIBQLknu54dxdurfJ7bx5imyRxCUC0u",
        "sesionId": "'.$_POST["sesionId"].'",
        "permisoComunicacion": true
      }';
    $curl = curl_init($sURL);
    
    curl_setopt($curl, CURLOPT_POSTFIELDS, $sPD); //body
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: text/json',
        'Content-Length: ' . strlen($sPD))
        );
    
    curl_setopt($curl, CURLINFO_HEADER_OUT,true);
    curl_setopt($curl, CURLOPT_POST, true);
    $curl_response = curl_exec($curl);

    $json_key = json_decode($curl_response);
    
    if (curl_error($curl)){
        print curl_error($curl);
    }
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json_key_err='error occured during curl exec. Additioanl info: ' . var_dump($info);
    }
    curl_close($curl);

    $_SESSION["sesionToken"] = $json_key -> return -> token;
    $_SESSION["validacionToken"] = $json_key -> ok;

    if ($json_key -> ok) {
        getUserVedi($_SESSION["sesionToken"]);
    }
    else{ 
        $_SESSION["dniUserVedi"] = "";
        echo json_encode (array(
            "ok" => false,
        ));
    }
  
}
//prueba coneccion para test
// if($cmd == "validarTokenSesionTaxi"){

//     $sURL="https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
//     // $sURL="https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
//     $sPD = '{
//         "idAplicacion": 116,
//         "secret":"sCKNGYBvTmonFkKwWvLnNlklaMBEN6e5zhCZamdE4yN4G1z3oflBcFeAfm72r4ID68RYfG7vLhGkEywtohiLxrGxDbSPxSw9h084UOprXDJSZ8Rp6YeBFjcDAK9qy4YB",
//         "sesionId": "'.$_POST["sesionId"].'",
//         "permisoComunicacion": true
//       }';
//     $curl = curl_init($sURL);
    
//     curl_setopt($curl, CURLOPT_POSTFIELDS, $sPD); //body
//     curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($curl, CURLOPT_HTTPHEADER, array(
//         'Content-Type: text/json',
//         'Content-Length: ' . strlen($sPD))
//         );
    
//     curl_setopt($curl, CURLINFO_HEADER_OUT,true);
//     curl_setopt($curl, CURLOPT_POST, true);
//     $curl_response = curl_exec($curl);

//     $json_key = json_decode($curl_response);
    
//     if (curl_error($curl)){
//         print curl_error($curl);
//     }
//     if ($curl_response === false) {
//         $info = curl_getinfo($curl);
//         curl_close($curl);
//         $json_key_err='error occured during curl exec. Additioanl info: ' . var_dump($info);
//     }
//     curl_close($curl);

//     $_SESSION["sesionToken"] = $json_key -> return -> token;
//     $_SESSION["validacionToken"] = $json_key -> ok;

//     if ($json_key -> ok) {
//         getUserVedi($_SESSION["sesionToken"]);
//     }
//     else{ 
//         $_SESSION["dniUserVedi"] = "";
//         echo json_encode (array(
//             "ok" => false,
//         ));
//     }
  
// }

if($cmd == "validarTokenSesionTaxi"){

    $sURL="https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
    // $sURL="https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/ValidarTokenSesion";
    $sPD = '{
        "idAplicacion": 119,
        "secret":"PtsOsAJ0j1bA9rNRPppqZtqlc53rSixT0QgtXEmzwt526iU5rWXLaKzsiBPaS15cx9f6butJxjsaNL2Xlf56QOWkkod513SoqjTkPcesXzl1ygfrXAtgQhuqjNSTEwoC",
        "sesionId": "'.$_POST["sesionId"].'",
        "permisoComunicacion": true
      }';
    $curl = curl_init($sURL);
    
    curl_setopt($curl, CURLOPT_POSTFIELDS, $sPD); //body
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: text/json',
        'Content-Length: ' . strlen($sPD))
        );
    
    curl_setopt($curl, CURLINFO_HEADER_OUT,true);
    curl_setopt($curl, CURLOPT_POST, true);
    $curl_response = curl_exec($curl);

    $json_key = json_decode($curl_response);
    
    if (curl_error($curl)){
        print curl_error($curl);
    }
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json_key_err='error occured during curl exec. Additioanl info: ' . var_dump($info);
    }
    curl_close($curl);

    $_SESSION["sesionToken"] = $json_key -> return -> token;
    $_SESSION["validacionToken"] = $json_key -> ok;

    if ($json_key -> ok) {
        getUserVedi($_SESSION["sesionToken"]);
    }
    else{ 
        $_SESSION["dniUserVedi"] = "";
        echo json_encode (array(
            "ok" => false,
        ));
    }
  
}


function getUserVedi($token){

    $sURL='https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v3/Usuario/';
    //$sURL='https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v3/Usuario/';

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $sURL,
        CURLOPT_USERAGENT => 'Simple cURL',
    ));

    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        '--token:'.$token,
    ));
    
    $curl_response = curl_exec($curl);

    $json_key = json_decode($curl_response);
    
    if (curl_error($curl)){
        print curl_error($curl);
    }
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json_key_err='error occured during curl exec. Additioanl info: ' . var_dump($info);
    }
    curl_close($curl);

    $_SESSION["dniUserVedi"] = $json_key -> return -> dni;
    $_SESSION["nombreUserVedi"] = $json_key -> return -> nombre;
    $_SESSION["cuilUserVedi"] = $json_key -> return -> cuil;
    $_SESSION["emailUserVedi"] = $json_key -> return -> email;
    $_SESSION["idsexoUserVedi"] = $json_key -> return -> idsexo;
    

    $_SESSION["datosUserVedi"] = json_encode (array(
        "documento" => $json_key -> return -> dni,
        "cuil" => $json_key -> return -> cuil,
        "apellido" => $json_key -> return -> apellido,
        "nombre" => $json_key -> return -> nombre,
        "domicilio" => $json_key -> return -> domicilioDireccion ." ". $json_key -> return -> domicilioAltura,
        "email" => $json_key -> return -> email,
        "celular" => $json_key -> return -> telefonoFijo,
        "idsexo" => $json_key -> return -> idsexo,

    ));
     
    echo json_encode (array(
        "ok" => true,
    ));
    
}


function getTokenPublicoTaxi(){

    $sURL="https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/TokenPublico";
    //$sURL="https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v1/Usuario/TokenPublico";
    $sPD = '{
        "idAplicacion": 119,
        "secret":"PtsOsAJ0j1bA9rNRPppqZtqlc53rSixT0QgtXEmzwt526iU5rWXLaKzsiBPaS15cx9f6butJxjsaNL2Xlf56QOWkkod513SoqjTkPcesXzl1ygfrXAtgQhuqjNSTEwoC",        
        "permisoComunicacion": true
      }';
    $curl = curl_init($sURL);
    
    // "secret":"sCKNGYBvTmonFkKwWvLnNlklaMBEN6e5zhCZamdE4yN4G1z3oflBcFeAfm72r4ID68RYfG7vLhGkEywtohiLxrGxDbSPxSw9h084UOprXDJSZ8Rp6YeBFjcDAK9qy4YB",

    curl_setopt($curl, CURLOPT_POSTFIELDS, $sPD); //body
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: text/json',
        'Content-Length: ' . strlen($sPD))
        );
    
    curl_setopt($curl, CURLINFO_HEADER_OUT,true);
    curl_setopt($curl, CURLOPT_POST, true);
    $curl_response = curl_exec($curl);

    $json_key = json_decode($curl_response);
    
    if (curl_error($curl)){
        print curl_error($curl);
    }
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json_key_err='error occured during curl exec. Additioanl info: ' . var_dump($info);
    }
    curl_close($curl);

    // $_SESSION["sesionToken"] = $json_key -> return;

    if ($json_key -> ok) {
        return $json_key -> return;
        // echo json_encode (array(
        //     "ok" => true,
        //     "token" => $json_key -> return
        // ));
    }
    else{ 
        // echo json_encode (array(
        //     "ok" => false,
        // ));
    }
  
}


if($cmd == "getUsuarioByCUIL"){

    $token = getTokenPublicoTaxi();
    $salt = "ysg5bqDo2I9uVT8ACFrKZQRgDSgIM4zsSCanSynZ8voYS4wPxHZc2SVgndzn7q4ExWmak9pTMmdJhEmSsGb3BNxxnTmtA0puh5OKNeUVpNV4Uqk2zRiCHddUNAOSerA1";
    
    $sha512 = hash("sha512", $token . $salt );
    
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v3/Usuario/GetUsuarioByCUIL',
      //CURLOPT_URL => 'https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v3/Usuario/GetUsuarioByCUIL',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_POSTFIELDS =>'{
        "cuil": "'.  $_POST["cuil"] .'" ,
        "secret": "'. $sha512 .'"
    }
    
    ',
      CURLOPT_HTTPHEADER => array(
        '--token: ' . $token,
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);

    $json_key = json_decode($response);
    $dataResponse = $json_key -> return;


    
    curl_close($curl);

    $idsexo = "02"; //genero femeino por defecto
    if ($dataResponse -> sexoMasculino) $idsexo = "01";

    $data = array(
        "documento" => $dataResponse -> dni,
        "cuil" => $dataResponse -> cuil,
        "apellido" => $dataResponse -> apellido,
        "nombre" => $dataResponse -> nombre,
        "idsexo" => $idsexo,
        "celular" => $dataResponse -> telefonoCelular,
        "email" => $dataResponse -> email,
    );


    if ($json_key -> ok) {
        echo json_encode (array(
            "ok" => true,
            "data" => $data,
        ));
    }
    else{ 
        echo json_encode (array(
            "ok" => false,
        ));
    }

}

if($cmd == "enviarComunicacionVedi"){

    $asunto = "asunto";
    $mensaje = "mensaje";

    $token = getTokenPublicoTaxi();
    $salt = "ysg5bqDo2I9uVT8ACFrKZQRgDSgIM4zsSCanSynZ8voYS4wPxHZc2SVgndzn7q4ExWmak9pTMmdJhEmSsGb3BNxxnTmtA0puh5OKNeUVpNV4Uqk2zRiCHddUNAOSerA1";
    
    $sha512 = hash("sha512", $token . $salt );

    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://api.vedi.cordoba.gob.ar/WSVeDi_Bridge/v1/Comunicaciones/enviar',
      //CURLOPT_URL => 'https://api.vedi.stage.cordoba.gob.ar/WSVeDi_Bridge/v1/Comunicaciones/enviar',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>'{
        "secret": "'. $sha512 .'",
        "cuilDestinatario": "'.  $_POST["cuil"] .'" ,
        "asunto": "'. $asunto .'",
        "mensaje": "'. $mensaje .'",
        "firma": "Gestión Taxis y Remises",
        "ente": "Municipalidad de Córdoba",
    }',
    // CURLOPT_POSTFIELDS =>'{
    //     "secret": "'. $sha512 .'",
    //     "cuilDestinatario": "'.  $_POST["cuil"] .'" ,
    //     "asunto": "PRUEBA29",
    //     "mensaje": "MENSAJE VeDi 222",
    //     "infoDesc": "infoDesc",
    //     "infoDato": "InfoDato",
    //     "firma": "Gestión Taxis y Remises",
    //     "ente": "Ente",
    //     "subtítulo": "Subtítulo",
    //     "infoLink": "infoLink"
    // }',
      CURLOPT_HTTPHEADER => array(
        '--token: ' . $token,
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    // echo $response;


    // {
    //     "return": {
    //         "idEmailEnviado": 0,
    //         "email": "null",
    //         "resultado": "OK",
    //         "codigoError": null,
    //         "sesionHash": null,
    //         "mensaje": "El mensaje se envió correctamente"
    //     },
    //     "error": null,
    //     "statusCode": 200,
    //     "cookies": null,
    //     "ok": true
    // }
}


?>