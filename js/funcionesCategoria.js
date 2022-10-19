//////////GET, POST ,PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://168.138.231.33:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        },
    });
}

function postCategoria(){

    if($("#name").val().length==0 ||$("#description").val().length==0 ){
        alert("todos los campos son obligatorios");
    }else{

    let cajas ={
        name:$("#name").val(),
        description:$("#description").val()
    };

    $.ajax({
        url:"http://168.138.231.33:8080/api/Category/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la categoria");
            window.location.reload();
        }
    });
}
}


function putCategoria(idBotonActualizar){

    if($("#name").val().length==0 ||$("#description").val().length==0 ){
        alert("todos los campos son obligatorios");
    }else{

    let cajas ={
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };

    $.ajax({
        url:"http://168.138.231.33:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la categoria");
            window.location.reload();
        }
    }); 
}
}

function deleteCategoria(idBotonBorrar){
    //console.log (idBotonBorrar);
    Swal.fire({
        title: 'Esta seguro de boorar la categoria?',
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
            'se elimino correctamente la categoria.',
            'success'
          )

          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://168.138.231.33:8080/api/Category/"+ idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            data: JSON.stringify(myData),
            contentType:"application/json",
            success:function(respuesta){
                alert("se elimino correctamente la categoria");
                window.location.reload();
           }
        });

        }
      })
    
     
}

///////////////
function pintarCategoria(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='deleteCategoria("+respuesta[i].id+")'>Borrar</button>"
        myTable+="<td> <button onclick='putCategoria("+respuesta[i].id+")'>Actualizar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>"
    $("#resultado1").html(myTable);
}