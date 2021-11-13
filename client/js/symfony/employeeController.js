
const url = 'http://localhost:8080/company/serverSymfony/public/index.php'

const findAll = async() => {
    await $.ajax({
        type: 'GET',
        url: url+'/employee'
    }).done(res => {
        console.log(res);
        let table = $('#table');
        let listEmployees = res.listEmployees;

        table.append(
            "<tr class='bg-dark text-light'>"+
            "<th scope='col'>Id</th>"+
            "<th scope='col'>Nombre</th>"+
            "<th scope='col'>Id de Oficina</th>"+
            "<th scope='col' class='text-center'>Detalles</th>"+
            "<th scope='col' class='text-center'>Editar</th>"+
            "<th scope='col' class='text-center'>Baja</th>"+
            "</tr>"
        );

        for(let i = 0; i < listEmployees.length; i++){
            table.append(
                "<tr>"+
                "<td>"+listEmployees[i].id+"</th>"+
                "<td>"+listEmployees[i].name+"</th>"+
                "<td>"+listEmployees[i].idOffice+"</th>"+
                "<td class='text-center'><button data-toggle='modal' data-target='#details' class='btn btn-primary' onclick='getDetails("+listEmployees[i].id+")'><i class='fas fa-info-circle'></i></button></th>"+
                "<td class='text-center'><button data-toggle='modal' data-target='#update' class='btn btn-warning' onclick='getInfUpdate("+listEmployees[i].id+")'><i class='fas fa-edit'></i></button></th>"+
                "<td class='text-center'><button data-toggle='modal' data-target='#remove' class='btn btn-danger' onclick='remove("+listEmployees[i].id+")'><i class='fas fa-trash'></i></button></th>"+
                "</tr>"
            );
        }
    });
}

findAll();

const getById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url+'/employee/'+id
    }).done(res => res);
}

const getDetails = async(id) => {
    let employee = await getById(id);
    let r = new Date(employee.employee[0].registered.date);

    document.getElementById('d_registered').innerHTML = r.getFullYear()+'-'+(r.getMonth() + 1)+'-'+r.getDate();
    if(employee.employee[0].updated == null){
        document.getElementById('d_updated').innerHTML = 'Sin Actualización';
    }else{
        let u = new Date(employee.employee[0].updated.date);
        document.getElementById('d_updated').innerHTML = u.getDate()+'-'+u.getMonth()+'-'+u.getFullYear();
    }
    document.getElementById('d_status').innerHTML = employee.employee[0].status? "Activo": "Inactivo";
}

const getInfUpdate = async(id) => {
    let employee = await getById(id);

    document.getElementById('u_id').value = id;
    document.getElementById('u_name').value = employee.employee[0].name;
    document.getElementById('u_address').value = employee.employee[0].address;
    document.getElementById('u_salary').value = employee.employee[0].salary;
    document.getElementById('u_id_off').value = employee.employee[0].idOffice;
}

const create = async() => {
    let name = document.getElementById('c_name').value;
    let address = document.getElementById('c_address').value;
    let salary = document.getElementById('c_salary').value;
    let id_office = document.getElementById('c_id_off').value;

    $.ajax({
        type: 'POST',
        url: url+'/employee/create',
        data: {name, address, salary, id_office}
    }).done(res => {
        console.log(res);
    });
}

const update = async() => {
    let id = document.getElementById('u_id').value;
    let name = document.getElementById('u_name').value;
    let address = document.getElementById('u_address').value;
    let salary = document.getElementById('u_salary').value;
    let id_office = document.getElementById('u_id_off').value;

    $.ajax({
        type: 'POST',
        url: url+'/employee/update/'+id,
        data: {name, address, salary, id_office}
    }).done(res => {
        console.log(res);
    });
}

const remove = async(id) => {
    $.ajax({
        type: 'POST',
        url: url+'/employee/remove/'+id
    }).done(res => {
        console.log(res);
    });
}