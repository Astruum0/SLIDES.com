<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Stage;

class PlayController extends AbstractController
{
    /**
     * @Route("/choose_stage", name="choose_stage")
     */
    public function choose_stage() {

        // $repo = $this->getDoctrine()->getRepository(Stage::class);
        // $levels = $repo->findBy(["story_mode" => true]);
        // var_dump($levels);

        return $this->render('play/choosestage.html.twig', [
            ]);
    }


    /**
     * @Route("/play/{id}", name="play")
     */
    public function play($id): Response
    {
        return $this->render('play/index.html.twig', [
        ]);
    }
}
