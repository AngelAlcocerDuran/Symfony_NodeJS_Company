<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Query;

class OfficeController extends AbstractController
{
    public function findAll(){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT o.id, o.officeCode, o.address FROM App:Office o');
        $listOffices = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron registros'
        ];

        if(count($listOffices) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontraron '.count($listOffices).' registros',
                'listOffices' => $listOffices
            ];
        }

        return new JsonResponse($data);
    }

    public function getById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT o.id, o.officeCode, o.address FROM App:Office o WHERE o.id = :id');

        $query->setParameter(':id', $id);
        $office = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontro el registro'
        ];

        if(count($office) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'office' => $office
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $req){
        $em = $this->getDoctrine()->getManager();
        
        $office_code = $req->get('office_code', null);
        $address = $req->get('address', null);

        $o = new \App\Entity\Office();

        $o->setOfficeCode($office_code);
        $o->setAddress($address);

        $em->persist($o);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Se registro correctamente'
        ];

        return new JsonResponse($data);
    }

    public function update(Request $req, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Office o SET o.officeCode = :oc, o.address = :ad WHERE o.id = :id');

        $office_code = $req->get('office_code', null);
        $address = $req->get('address', null);

        $query->setParameter(':oc', $office_code);
        $query->setParameter(':ad', $address);
        $query->setParameter(':id', $id);
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
        $query = $em->createQuery('SELECT e.idOffice FROM App:Employee e WHERE e.idOffice = :id');
        $query->setParameter(':id', $id);
        $list = $query->getResult();

        if(count($list) > 0){
            $query = $em->createQuery('UPDATE App:Employee e SET e.idOffice = 0 WHERE e.idOffice = :id');
            $query->setParameter(':id', $id);
            $flag = $query->getResult();

            if($flag == 1){
                $query = $em->createQuery('DELETE FROM App:Office o WHERE o.id = :id');
                $query->setParameter(':id', $id);
                
                $office = $query->getResult();

                $data = ['status' => 200, 'message' => 'Se modificaron '.count($list).' registros y se elimino correctamente'];
            }else{
                $data = ['status' => 400, 'message' => 'Error de eliminacion'];
            }
        }else{
            $query = $em->createQuery('DELETE FROM App:Office o WHERE o.id = :id');
            $query->setParameter(':id', $id);

            $office = $query->getResult();

            $data = ['status' => 200, 'message' => 'Se elimino correctamente'];
        }

        return new JsonResponse($data);
    }
}
