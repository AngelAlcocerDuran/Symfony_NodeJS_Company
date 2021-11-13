
const url = 'http://localhost:8080/company/serverSymfony/public/index.php'

const findAll = async() => {
    await $.ajax({
        type: 'GET',
        url: url+'/office'
    }).done(res => {
        console.log(res);
        let table = $('#table');
        let listOffices = res.listOffices;

        table.append(
            "<tr class='bg-dark text-light'>"+
            "<th scope='col'>Id</th>"+
            "<th scope='col'>Código de Oficina</th>"+
            "<th scope='col'>Dirección</th>"+
            "<th scope='col' class='text-center'>Editar</th>"+
            "<th scope='col' class='text-center'>Eliminar</th>"+
            "</tr>"
        );

        for(let i = 0; i < listOffices.length; i++){
            table.append(
                "<tr>"+
                "<td>"+listOffices[i].id+"</th>"+
                "<td>"+listOffices[i].officeCode+"</th>"+
                "<td>"+listOffices[i].address+"</th>"+
                "<td class='text-center'><button data-toggle='modal' data-target='#update' class='btn btn-warning' onclick='getInfUpdate("+listOffices[i].id+")'><i class='fas fa-edit'></i></button></th>"+
                "<td class='text-center'><button data-toggle='modal' data-target='#remove' class='btn btn-danger' onclick='remove("+listOffices[i].id+")'><i class='fas fa-trash'></i></button></th>"+
                "</tr>"
            );
        }
    });
}

findAll();

const getById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url+'/office/'+id
    }).done(res => res);
}

const getInfUpdate = async(id) => {
    let office = await getById(id);

    document.getElementById('u_id').value = id;
    document.getElementById('u_code').value = office.office[0].officeCode;
    document.getElementById('u_address').value = office.office[0].address;
}

const create = async() => {
    let office_code = document.getElementById('c_off_code').value;
    let address = document.getElementById('c_address').value;

    $.ajax({
        type: 'POST',
        url: url+'/office/create',
        data:{office_code, address}
    }).done(res => {
        console.log(res);
    });
}

const update = async() => {
    let id = document.getElementById('u_id').value;
    let office_code = document.getElementById('u_code').value;
    let address = document.getElementById('u_address').value;

    $.ajax({
        type: 'POST',
        url: url+'/office/update/'+id,
        data: {office_code, address}
    }).done(res => {
        console.log(res);
    });
}

const remove = async(id) => {
    $.ajax({
        type: 'POST',
        url: url+'/office/remove/'+id
    }).done(res => {
        console.log(res);
    });
}