<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Query;

class EmployeeController extends AbstractController
{
    public function findAll(){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, 
        e.updated, e.status, e.idOffice FROM App:Employee e');
        $listEmployees = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No existen registros'
        ];

        if(count($listEmployees) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontraron '.count($listEmployees).' registros',
                'listEmployees' => $listEmployees
            ];
        }

        return new JsonResponse($data);
    }

    public function getById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, 
        e.updated, e.status, e.idOffice FROM App:Employee e WHERE e.id = :id');

        $query->setParameter(':id', $id);
        $employee = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No existe el registro'
        ];

        if(count($employee) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'employee' => $employee
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $req){
        $em = $this->getDoctrine()->getManager();
        
        $name = $req->get('name', null);
        $address = $req->get('address', null);
        $salary = $req->get('salary', null);
        $registered = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
        $id_off = $req->get('id_office', null);
        $status = 1;

        $e = new \App\Entity\Employee();

        $e->setName($name);
        $e->setAddress($address);
        $e->setSalary($salary);
        $e->setRegistered($registered);
        $e->setIdOffice($id_off);
        $e->setStatus($status);

        $em->persist($e);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Se registro correctamente'
        ];
        
        return new JsonResponse($data);
    }

    public function update(Request $req, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Employee e SET e.name = :name, e.address = :ad, e.salary = :sal, e.updated = :up,
        e.idOffice = :ioff WHERE e.id = :id');
        
        $name = $req->get('name', null);
        $address = $req->get('address', null);
        $salary = $req->get('salary', null);
        $updated = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
        $id_off = $req->get('id_office', null);

        $query->setParameter(':id', $id);
        $query->setParameter(':name', $name);
        $query->setParameter(':ad', $address);
        $query->setParameter(':sal', $salary);
        $query->setParameter(':up', $updated);
        $query->setParameter(':ioff', $id_off);
        $flag = $query->getResult();

        if($flag == 1){
            $data = ['status' => 200, 'message' => 'Se modifico correctamente'];
        }else{
            $data = ['status' => 400, 'message' => 'Error de modificacion'];
        }

        return new JsonResponse($data);
    }

    public function remove($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Employee e SET e.status = 0 WHERE e.id = :id');

        $query->setParameter(':id', $id);
        $employee = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se dio de baja un empleado'
        ];

        return new JsonResponse($data);
    }
}
