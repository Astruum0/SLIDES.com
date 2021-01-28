<?php

namespace App\Entity;

use App\Repository\StageRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=StageRepository::class)
 */
class Stage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="level_name")
     */
    private $author_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $level_name;

    /**
     * @ORM\Column(type="text")
     */
    private $level_composition;

    /**
     * @ORM\Column(type="integer")
     */
    private $plays = 1;

    /**
     * @ORM\Column(type="integer")
     */
    private $success = 1;

    /**
     * @ORM\Column(type="boolean")
     */
    private $story_mode = false;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthorId(): ?user
    {
        return $this->author_id;
    }

    public function setAuthorId(?user $author_id): self
    {
        $this->author_id = $author_id;

        return $this;
    }

    public function getLevelName(): ?string
    {
        return $this->level_name;
    }

    public function setLevelName(string $level_name): self
    {
        $this->level_name = $level_name;

        return $this;
    }

    public function getLevelComposition(): ?string
    {
        return $this->level_composition;
    }

    public function setLevelComposition(string $level_composition): self
    {
        $this->level_composition = $level_composition;

        return $this;
    }

    public function getPlays(): ?int
    {
        return $this->plays;
    }

    public function setPlays(int $plays): self
    {
        $this->plays = $plays;

        return $this;
    }

    public function getSuccess(): ?int
    {
        return $this->success;
    }

    public function setSuccess(int $success): self
    {
        $this->success = $success;

        return $this;
    }

    public function getStoryMode(): ?bool
    {
        return $this->story_mode;
    }

    public function setStoryMode(bool $story_mode): self
    {
        $this->story_mode = $story_mode;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
