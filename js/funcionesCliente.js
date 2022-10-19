//////////GET, POST ,PUT Y DELETE

function getCliente(){
    $.ajax({
        url:"http://168.138.231.33:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        },
    });
}

function postCliente(){
    if($("#email").val().length==0 ||
    $("#password").val().length==0 ||
    $("#name").val().length==0 ||
    $("#age").val().length==0){
        alert("todos los campos son obligatorios");
    }else{

    let cajas ={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };


    $.ajax({
        url:"http://168.138.231.33:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el cliente");
            window.location.reload();
        }
    });
  }
}

function putCliente(idBotonActualizar){
    
    if ($("#email").val().length==0 || 
    $("#password").val().length==0 || 
    $("#name").val().length==0 || 
    $("#age").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
        let cajas = {
            idClient:idBotonActualizar,
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        console.log(cajas);
    
    $.ajax({
        url:"http://168.138.231.33:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Cliente actualizado correctamente");
            window.location.reload();
        }
    });
    }
}

function deleteCliente(idBotonBorrar){
    //console.log (idBotonBorrar);
    Swal.fire({
        title: 'Esta seguro de boorar el cliente?',
        text: "si esta seguro oprima si, borrar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'se elimino correctamente el cliente.',
            'success'
          )

          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://168.138.231.33:8080/api/Client/"+ idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            data: JSON.stringify(myData),
            contentType:"application/json",
            success:function(respuesta){
                //alert("se elimino correctamente el cliente");
                window.location.reload();
           }
        });

        }
      })
    
     

}

///////////////
function pintarCliente(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='deleteCliente("+respuesta[i].idClient+")'>Borrar</button>"
        myTable+="<td> <button onclick='putCliente("+respuesta[i].idClient+")'>Actualizar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>"
    $("#resultado2").html(myTable);
}