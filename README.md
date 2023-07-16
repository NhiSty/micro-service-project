# micro-service-project

Ce projet à été réalisé en nestjs avec 3 apis :
- Auth-Api
- Hotel-Api
- Reservation-Api

Le but est de pouvoir créer un hotel en fournissant différentes informations et d'y effectuer des réservations.


## Installation et lancement

A la racine du projet, effectuer la commande suivante :
```bash
$ npm install
```

A l'intérieur des différentes api, effectuer la commande suivante pour installer les dépendances  :
```bash
$ npm install
```

Ensuite, il faut lancer la commande suivante pour lancer docker :
```bash
$ docker compose up --build
```

Puis, il faut jouer les migrations avec la commande suivante :
```bash
$ npx prisma migrate dev
```

Enfin, il faut lancer les différentes api (hotel-api et reservation-api) avec la commande suivante :
```bash
$ npm start
```

## Variables d'environnement

#### À mettre dans le .env du projet hotel-api
```
DATABASE_URL="mysql://root:passwd@localhost:3306/hotel"
```

#### À mettre dans le .env du projet reservation-api
```
DATABASE_URL="mysql://root:passwd@localhost:3306/reservation"
```
#### À mettre dans le .env du projet auth-api 
```
MYSQL_URL="mysql://root:passwd@localhost:3306/auth"
```

## Explication hotel-api et reservation-api

Le but est de pouvoir créer un hotel en fournissant différentes informations comme le nom, l'addresse, la ville et pays.
Lorsque l'on crée un hotel, on crée par défaut automatiquement 5 chambres ayant comme informations un Id, roomNumber, available, et hotelId.

Lorsque qu'on crée une reservation, on fournit les informations suivants : name, hotelId, roomId, checkInDate et checkOutDate qui sont des dates au format JJ/MM/AAAA en string.

Nous avons mis en place l'appel inter-api entre Hotel et Reservation.
lorsqu'on créee un réservation, le processus récupère l'hotel et la roomId, et passe le statut "available" à false pour dire que la chambre n'est plus réservable.

### Routes hotel-api
Voici les informations postman concernant hotel-api :

![route_hotelApi](imgForReadme/img.png)

Nous avons mis en place les routes par défaut :

* Find => qui nous renvoie tous les hotels
* Find avec paramètre Id => qui nous renvoie l'hotel dont l'Id est passé en "Message"
* Find avec paramètre name => qui nous renvoie l'hotel dont le nom est passé en "Message"
* Create => Crée et renvoie l'hotel crée avec les chambres
* Update => Met à jours et renvoie l'hotel et les chambres
* UpdateRoomInHotel => Change le status d'une chambre et renvoie l'hotel et les chambres 

#### Exemple d'utilisation
Pour setup votre postman, vous pouvez suivre [ce tuto](tester_avec_postman.md).

- HotelCRUDService : Find
![hotelFind](imgForReadme/imgHotelFind.png)


- HotelCRUDService : FindById
![hotelFindById](imgForReadme/imgHotelFindById.png)


- HotelCRUDService : FindByName
![hotelFindByName](imgForReadme/imgHotelFindByName.png)


- HotelCRUDService : Create
![hotelCreate](imgForReadme/imgHotelCreate.png)


- HotelCRUDService : Update (dans cet exemple, on change uniquement le nom de l'hotel)
![HotelUpdate](imgForReadme/imgHotelUpdate.png)


- HotelCRUDService : UpdateRoomInHotel (ici id correspond à roomId)
<br /> Après avoir executé la requête, on peut voir lorsqu'on lance un find ou find by id ou by name que la chambre est passée de available: true à available: false
![hotelUpdateStatusRoom.png](imgForReadme/imgHotelUpdateStatusOfRoom.png)


- HotelCRUDService : Delete
![hotelDelete](imgForReadme/imgHotelDelete.png)


### Routes hotel-api
Voici les informations postman concernant reservation-api :
![imgRoutesReserv.png](imgForReadme/imgRoutesReserv.png)

Voic la définition des routes :
* GetReservation avec paramètre id => nous renvoie la reservation dont l'id correspond à l'id fourni
* ListReservations => nous renvoi la liste de toutes les reservations en cours
* ListReservations avec parametre roomId => nous renvoi la liste des reservations en cours pour la roomId donnée
* ListReservations avec parametre checkInDate et checkOutDate => nous renvoi la liste de toutes les reservations pour la date d'entrée et date sortie fourni
* CreateReservation => Crée une reservation dans l'hotel et dans la chambre souhaité. La création de la reservation passe le statut "available" à false dans l'api Hotel -> HotelRoom
* UpdateReservation => Modifie une réservation avec les informations souhaitées
* DeleteReservation => Supprime une réservation et passe le status "available" de la chambre à true

#### Exemple d'utilisation
Pour setup votre postman, vous pouvez suivre [ce tuto](tester_avec_postman.md).

- ReservationCRUDService : GetReservation
![imgGetReserv.png](imgForReadme/imgGetReserv.png)


- ReservationCRUDService : ListReservations
![imgListReserv.png](imgForReadme/imgListReserv.png)


- ReservationCRUDService : ListReservationsByRoomId
![imgReservByRoomId.png](imgForReadme/imgReservByRoomId.png)


- ReservationCRUDService : ListReservationsByCheckInDateAndCheckOutDate
![imgListReservByDate](imgForReadme/imgListReservByDate.png)


- ReservationCRUDService : CreateReservation
![imgReservationCreate.png](imgForReadme/imgReservationCreate.png)


- ReservationCRUDService : UpdateReservation (dans cet exemple on effectue uniquement le changement des dates)
![imgUpdateResev.png](imgForReadme/imgUpdateResev.png)


- ReservationCRUDService : DeleteReservation
![imgReservDelete.png](imgForReadme/imgReservDelete.png)