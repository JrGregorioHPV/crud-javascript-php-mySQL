<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexion a la Base de Datos
$Servidor = "localhost";
$Usuario = "root";
$Password = "";
$BD = "empleados";

$Conexion = new mysqli($Servidor, $Usuario, $Password, $BD);

// Consulta datos y recepciona una clave para consultar dichos datoa con dicha clave
if(isset($_GET["consultar"])){
    $sqlEmpleados = mysqli_query($Conexion, "SELECT * FROM empleados WHERE id=".$_GET["consultar"]);

    if(mysqli_num_rows($sqlEmpleados) > 0){
        $empleados = mysqli_fetch_all($sqlEmpleados, MYSQLI_ASSOC);
        echo json_encode($empleados);
        exit();
    }
    else {
        echo json_encode(["success" => 0]);
    }
}

// Borrar pero se le debe enviar una clave (para borrarlo)
if(isset($_GET["borrar"])){
    $sqlEmpleadoss = mysqli_query($Conexion, "DELETE FROM empleados WHERE id=".$_GET["borrar"]);
    if($sqlEmpleadoss){
        echo json_encode(["success" => 1]);
        exit();
    }
    else {
    echo json_encode(["success" => 0]);
    }
}

// Inserta un nuevo registro y recepciona en m'etodo posto
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre = $data->nombre;
    $correo = $data->correo;

    if(($correo != "") && ($nombre != "")){
        $sqlEmpleados = mysqli_query($Conexion, "INSERT INTO empleados (nombre, correo) VALUES ('$nombre', '$correo')");
        echo json_encode(["success" => 1]);
    }
    exit();
}

// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualizacion
if(isset($_GET["actualizar"])){
    $data = json_decode(file_get_contents("php://input"));

    $id = (isset($data->id)) ? $data->id: $_GET["actualizar"];
    $Nombre = $data->nombre;
    $EMail = $data->correo;

    $sqlEmpleados = mysqli_query($Conexion, "UPDATE empleados SET nombre='$Nombre', correo='$EMail' WHERE id='$id'");
    echo json_encode(["success" => 1]);
    exit();
}

// Consulta todos los registros de la tabla "empleados"
$sqlEmpleados = mysqli_query($Conexion, "SELECT * FROM empleados");
if(mysqli_num_rows($sqlEmpleados) > 0){
    $empleados = mysqli_fetch_all($sqlEmpleados, MYSQLI_ASSOC);
    echo json_encode($empleados);
}
else {
    echo json_encode(["success" => 0]);
}

?>