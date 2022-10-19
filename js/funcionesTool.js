//////GET,POST,PUT Y DELETE

function getTool(){
    $.ajax({
        url:"http://168.138.231.33:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarTool(respuesta);
        },
    });

}
function postTool(){

    if($("#name").val().length==0 ||
    $("#brand").val().length==0 ||
    $("#year").val().length==0 ||
    $("#description").val().length==0 ){
        alert("todos los campos son obligatorios");
    }else{
    let cajas ={
        brand:$("#brand").val(),
        year:$("#year").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()}
    };
    console.log(cajas);

    $.ajax({
        url:"http://168.138.231.33:8080/api/Tool/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la herramienta");
            window.location.reload();
        }
    });
  }
}
function putTool(idBotonActualizar){
    if($("#name").val().length==0 ||
    $("#brand").val().length==0 ||
    $("#year").val().length==0 ||
    $("#description").val().length==0 ){
        alert("todos los campos son obligatorios");
    }else{

    let cajas ={
        id:idBotonActualizar,
        brand:$("#brand").val(),
        year:$("#year").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()}
    };

    $.ajax({
        url:"http://168.138.231.33:8080/api/Tool/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la Herramienta");
            window.location.reload();
        }
    }); 
}

}
function deleteTool(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de boorar la tool?',
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
            'se elimino correctamente la herramienta.',
            'success'
          )

          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://168.138.231.33:8080/api/Tool/"+ idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            data: JSON.stringify(myData),
            contentType:"application/json",
            success:function(respuesta){
                //alert("se elimino correctamente la Herramienta");
                window.location.reload();
           }
        });

        }
      })

}


///////
function getTool_Category(){
   
    $.ajax({
        url:"http://168.138.231.33:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select= $("#select-category");
            $.each(respuesta,function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
}

///////////////
function pintarTool(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.description+"</td>";
        myTable+="<td> <button onclick='deleteTool("+respuesta[i].id+")'>Borrar</button>"
        myTable+="<td> <button onclick='putTool("+respuesta[i].id+")'>Actualizar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>"
    $("#resultado3").html(myTable);
}
