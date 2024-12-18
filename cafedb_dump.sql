-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: cafe_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafes`
--

DROP TABLE IF EXISTS `cafes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafes` (
  `cafe_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `description` text,
  `price_range` enum('Low','Mid','High') NOT NULL DEFAULT 'Mid',
  `size` enum('Small','Medium','Large') NOT NULL DEFAULT 'Medium',
  PRIMARY KEY (`cafe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafes`
--

LOCK TABLES `cafes` WRITE;
/*!40000 ALTER TABLE `cafes` DISABLE KEYS */;
INSERT INTO `cafes` VALUES (1,'The Coffee Collective','J├ªgersborggade 10, 2200 K├╕benhavn N',4.8,'Known for its sustainable coffee sourcing.','Mid','Medium'),(2,'Original Coffee','Illum Rooftop, ├ÿstergade 52, 1100 K├╕benhavn K',4.5,'Rooftop cafe with great views of the city.','Mid','Large'),(3,'Kaffekilden','N├╕rrebrogade 162, 2200 K├╕benhavn N',4.6,'Cozy cafe with locally sourced pastries.','Low','Medium'),(4,'Prolog Coffee Bar','H├╕kerboderne 16, 1712 K├╕benhavn V',4.7,'Small but popular cafe with quality espresso.','Mid','Small'),(5,'Atelier September','Gothersgade 30, 1123 K├╕benhavn K',4.4,'Charming cafe with Scandinavian interior and healthy options.','Mid','Medium'),(6,'Democratic Coffee','Krystalgade 15, 1172 K├╕benhavn K',4.5,'Located inside a library with fantastic croissants.','Mid','Medium'),(7,'Hart Bageri','Gl. Kongevej 109, 1850 Frederiksberg',4.9,'Cafe and bakery with fresh pastries and artisanal bread.','High','Medium'),(8,'Sonny','R├Ñdhusstr├ªde 5, 1466 K├╕benhavn K',4.6,'Bright and modern cafe with brunch options.','Mid','Large'),(9,'Rist Kaffebar','Vesterbrogade 2, 1620 K├╕benhavn V',4.3,'Small cafe with strong focus on specialty coffee.','Low','Small'),(10,'Next Door Cafe','Larsbj├╕rnsstr├ªde 23, 1454 K├╕benhavn K',4.2,'Homey atmosphere with quirky decor.','Low','Small'),(11,'M├╕llers Kaffe & K├╕kken','Nansensgade 19, 1366 K├╕benhavn K',4.7,'Popular spot for breakfast and coffee.','Mid','Large'),(12,'Andersen & Maillard','N├╕rrebrogade 62, 2200 K├╕benhavn N',4.8,'Minimalist cafe with house-made pastries.','Mid','Medium'),(13,'Sweet Treat','Torvehallerne, Frederiksborggade 21, 1360 K├╕benhavn K',4.3,'Located in a food market with delicious desserts.','Low','Medium'),(14,'Kaffebaren p├Ñ Amager','Amagerbrogade 184, 2300 K├╕benhavn S',4.2,'A favorite among locals on Amager.','Low','Large'),(15,'Mirabelle Bakery','Guldbergsgade 29, 2200 K├╕benhavn N',4.6,'Bakery and cafe with high-quality coffee.','High','Medium'),(16,'BevarΓÇÖs','Ravnsborggade 10B, 2200 K├╕benhavn N',4.5,'Laid-back spot with a relaxed vibe.','Low','Medium'),(17,'Kalaset','Vendersgade 16, 1363 K├╕benhavn K',4.4,'Vintage-styled cafe with brunch favorites.','Mid','Medium'),(18,'Paludan Bogcafe','Fiolstr├ªde 10, 1171 K├╕benhavn K',4.5,'Bookstore cafe with a unique ambiance.','Low','Medium'),(19,'The Living Room','Larsbj├╕rnsstr├ªde 17, 1454 K├╕benhavn K',4.4,'Warm, cozy cafe with comfortable seating.','Low','Small'),(20,'42Raw','Pilestr├ªde 32, 1112 K├╕benhavn K',4.2,'Vegan cafe with raw food options and great coffee.','Low','Medium');
/*!40000 ALTER TABLE `cafes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `favorite_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cafe_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`favorite_id`),
  UNIQUE KEY `user_id` (`user_id`,`cafe_id`),
  KEY `cafe_id` (`cafe_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`cafe_id`) REFERENCES `cafes` (`cafe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Skyler99','skyler99@example.com','Skyler99Pass'),(2,'JazzyFox','jazzyfox@example.com','JazzyFoxPass'),(3,'PixelHunter','pixelhunter@example.com','PixelHunterPass'),(4,'NovaBlaze','novablaze@example.com','NovaBlazePass'),(5,'ArcticWolf','arcticwolf@example.com','ArcticWolfPass'),(6,'ShadowHawk','shadowhawk@example.com','ShadowHawkPass'),(7,'CrimsonStar','crimsonstar@example.com','CrimsonStarPass'),(8,'EchoTiger','echotiger@example.com','EchoTigerPass'),(9,'BlazeRunner','blazerunner@example.com','BlazeRunnerPass'),(10,'FrostByte','frostbyte@example.com','FrostBytePass'),(11,'SteelViper','steelviper@example.com','SteelViperPass'),(12,'GoldenPheonix','goldenpheonix@example.com','GoldenPheonixPass'),(13,'DarkPhantom','darkphantom@example.com','DarkPhantomPass'),(14,'SilentDusk','silentdusk@example.com','SilentDuskPass'),(15,'ThunderPanda','thunderpanda@example.com','ThunderPandaPass'),(16,'SolarKnight','solarknight@example.com','SolarKnightPass'),(17,'MoonBlade','moonblade@example.com','MoonBladePass'),(18,'RogueFlame','rogueflame@example.com','RogueFlamePass'),(19,'IronShadow','ironshadow@example.com','IronShadowPass'),(20,'MysticRaven','mysticraven@example.com','MysticRavenPass');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 23:14:28
