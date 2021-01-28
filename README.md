# SLIDES</span>.com

## 1. Présentation du site

SLIDES</span>.com est un jeu de puzzle où vous controllez un personnage dans un espace 2 dimensions, votre but est de completer le niveau en trouvant le chemin correct vers la ligne d'arrivée. Au dela des niveaux déjà existants qui formement le mode "Histoire", le jeu tourne autour d'une fonctionnalité essentielle: le créateur de niveau. En effet chaque utilisateur est capable de créer son propre niveau, et de le partager sur le site pour qu'il soit visible par les autres utilisateurs. Vous avez donc accès à une infinité de niveau créée par les utilisateurs, que vous pouvez classer par popularité, jouabilité ou ancienneté. un système de "j'aime" vous permettra de marquer vos niveaux préférés. Lorsque vous testez un niveau et que vous le réussissez, l'information sera conservée et analysée pour déterminer le pourcentage de réussite du niveau.
Le jeu est jouable entièrement sans obligation de création de compte, toutefois, il sera nécéssaire d'avoir un compte si vous souaitez mettre en ligne un de vos niveaux.

## 2. Cahier des charges

- Jeu principal, avec une 15aine de niveau déjà créés jouable uniquement si on réussi le niveau précédent
- Une authentification pour pouvoir sauvegarder sa progression dans les différents niveaux (Implique une page de création de profil)
- Un système d’éditeur de niveau qui permettrait de créer son propre niveau et de le mettre en ligne
- Un catalogue pour voir les niveaux créés par n’importe quel utilisateur
- Permettre à l’utilisateur de “liker” des niveaux
- Un système pour pouvoir indiquer le nombre de fois qu’un niveau à été joué, et combien de fois il a été réussi
- Pouvoir rechercher un niveau à l’aide d’une barre de recherche, et pouvoir établir des tris lors de notre recherche, par exemple chercher les niveaux les plus difficiles, les plus joués, les plus récents ou les plus “likés”
- Une page Tutoriel pour avec une vidéo explicative du jeu
- Une page « Profil » ou l’utilisateur pourra voir tous les niveaux qu’il a posté (avec les possibilité de les supprimer), tous ceux qu’il a “liké” et aussi CRUD les informations de son profil
- Une page « Admin » pour pouvoir modifier tous les profils, supprimer des niveaux
- Envoi de mail lors d’inscription, lorsqu’un des niveaux de l’utilisateur est liké, et en cas d’oubli de mot de passe

## 3. Technologies utilisées

- Langage WEB : HTML/CSS/JS - PHP
- Framework: Symfony
- Base de données: MySQL
- Serveur WEB: Apache
- Serveur Local: MAMP / XAMPP
- Gestionnaire de dépendances: Composer
- ORM: Doctrine

## 3. Architecture du site web

![](https://imgur.com/2o1ZuLg.png)

## 4. Diagramme base de données

![](https://imgur.com/xT8TufW.png)

## 5. Diagrammes UML
### 5.1 Diagramme de cas d'utilisation
![](https://i.imgur.com/LelV53A.png)

### 5.2 Diagramme de séquence niveau
![](https://i.imgur.com/cGDYIcD.png)
