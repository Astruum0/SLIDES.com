<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(
 *  fields={"email"},
 *  errorPath="email",
 *  message="This email is already used !"
 * )
 * @UniqueEntity(
 *  fields={"username"},
 *  errorPath="username",
 *  message="This username is already used !"
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min="6", minMessage="Your Password has to be at least 6 characters long")
     * @Assert\EqualTo(propertyPath="confirm_password", message="Passwords don't match !")
     */
    private $password;

    /**
     * @ORM\Column(type="integer")
     */
    private $progress = 0;

    public $confirm_password;

    /**
     * @ORM\OneToMany(targetEntity=Stage::class, mappedBy="author_id")
     */
    private $level_name;

    public function __construct()
    {
        $this->level_name = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getProgress(): ?int
    {
        return $this->progress;
    }

    public function setProgress(int $progress): self
    {
        $this->progress = $progress;

        return $this;
    }

    public function eraseCredentials() {}
    public function getSalt() {}
    public function getRoles() {
        return ["ROLE_USER"];
    }

    /**
     * @return Collection|Stage[]
     */
    public function getLevelName(): Collection
    {
        return $this->level_name;
    }

    public function addLevelName(Stage $levelName): self
    {
        if (!$this->level_name->contains($levelName)) {
            $this->level_name[] = $levelName;
            $levelName->setAuthorId($this);
        }

        return $this;
    }

    public function removeLevelName(Stage $levelName): self
    {
        if ($this->level_name->removeElement($levelName)) {
            // set the owning side to null (unless already changed)
            if ($levelName->getAuthorId() === $this) {
                $levelName->setAuthorId(null);
            }
        }

        return $this;
    }
}
