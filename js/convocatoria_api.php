<?php
    $url = $_POST['url'];
    $ch  = curl_init();

    // $url = $url_convocatoria;
    

    curl_setopt($ch, CURLOPT_URL, $url);
    // $data_copia['idusuario'] = $idusuario;
    // $data_copia['id'] = $id;

    // $elements                = $data_copia;
    curl_setopt($ch, CURLOPT_POST,true); 

    // curl_setopt($ch, CURLOPT_POSTFIELDS, $elements);
    curl_setopt($ch, CURLOPT_HEADER, false);
   // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
   curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, false);
   
   //Comentar línea, solo para funcionamiento local
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
	
    $resultado = curl_exec($ch);
    $error     = curl_error($ch);
    curl_close($ch);
    echo $resultado;
?>