<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Stage;
use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class PlayController extends AbstractController
{
    /**
     * @Route("/choose_stage", name="choose_stage")
     */
    public function choose_stage(TokenStorageInterface $tokenStorage) {

        $user=$tokenStorage->getToken()->getUser();
        dump($user);
        if ($user == "anon.") {
            $progress = 0; 
        } else {
            $progress = $user->getProgress();    
        }
        

        $repo = $this->getDoctrine()->getRepository(Stage::class);
        $levels = $repo->findBy(["story_mode" => true], ['id' => 'ASC']);
        dump($levels);

        return $this->render('play/choosestage.html.twig', [
                'levels' => $levels,
                'progress' => $progress,
            ]);
    }


    /**
     * @Route("/play/{id}", name="play")
     */
    public function play($id): Response
    {
        $repo = $this->getDoctrine()->getRepository(Stage::class);
        $level = $repo->find($id);
        dump($level);

        return $this->render('play/index.html.twig', [
        ]);
    }
}
