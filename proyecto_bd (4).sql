-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2024 a las 03:43:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `botellaslatas`
--

CREATE TABLE `botellaslatas` (
  `Id` tinyint(4) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Segundos` int(11) DEFAULT NULL,
  `Peso` double DEFAULT NULL,
  `Altura` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `botellaslatas`
--

INSERT INTO `botellaslatas` (`Id`, `Nombre`, `Segundos`, `Peso`, `Altura`) VALUES
(1, 'Botella de Agua 1.5L', 1500, 30, 31),
(2, 'Botella de Agua 1L', 1200, 20, 28),
(3, 'Botella de Agua 500 ml y Lata aluminio 710 ml', 900, 20, 16.5),
(4, 'Lata aluminio 473 ml', 720, 15, 13.1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chatbot`
--

CREATE TABLE `chatbot` (
  `Id` int(11) NOT NULL,
  `Pregunta` varchar(255) DEFAULT NULL,
  `Respuesta` varchar(255) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  `UsuarioModerador` int(11) DEFAULT NULL,
  `UsuarioNormal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chatbot`
--

INSERT INTO `chatbot` (`Id`, `Pregunta`, `Respuesta`, `Estado`, `UsuarioModerador`, `UsuarioNormal`) VALUES
(1, 'Duda', 'Duda Resuelta', 'R', 2, 2),
(2, 'Otra duda', NULL, 'A', NULL, 2),
(3, 'Nueva duda', NULL, 'A', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credenciales`
--

CREATE TABLE `credenciales` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `credenciales`
--

INSERT INTO `credenciales` (`Id`, `Usuario`, `Contrasena`) VALUES
(1, 'Rocobros21', '$2a$10$py5/SOx0y74p0sF0M9giz.C0YLgmA4wLQxNy/5aS5yqAn2HxglN7S'),
(2, 'RodrigoR21', 'Rocobros2105'),
(3, 'Admin123', '$2a$10$9cPjDvzg5DAQJg.bmHLIRe2.81ewSTWlWMSFZ4aK.zouhR0M4uXey'),
(4, 'Moder123', 'Moder123'),
(5, 'Moderator123', '$2a$10$g.GL8E6JuRf5PgOFCmLxXuzJHL5pIum0fx5/Whe4k0zadMJL/GNcW'),
(6, 'Diego123', 'Diego123'),
(7, 'Rodrigo1234', 'Rodrigo1234'),
(29, 'Monika', '$2a$08$COv4rxfHzuCdde1gPkZRzOxSFpg1gY4PHPHV5kdV2tOL/CYcUfSdG'),
(31, 'Wachos17', '$2a$10$vS3MdOQ6sGGcmqWkk.bEwOUTQ1/mu.rs5HjY6bmOWA/yi.3Z0Rile'),
(65, 'Susana123', '$2a$10$95hi84Bg0uVVS/t385oo.uF7.hSDSY2AbQ6BvcgpBDBp3prsYXGhy'),
(66, 'Moderador123', '$2a$10$tYaEx.2ZuM/QswngshwtLeACamXYPUGuAWqUoJLt/WpO1/EkQYH0G');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivelusuario`
--

CREATE TABLE `nivelusuario` (
  `Id` tinyint(4) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `CantidadMinima` smallint(6) DEFAULT NULL,
  `SegundosAlMes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivelusuario`
--

INSERT INTO `nivelusuario` (`Id`, `Nombre`, `CantidadMinima`, `SegundosAlMes`) VALUES
(2, 'Principiante Verde', 0, 0),
(3, 'Explorador del Eco', 21, 60),
(4, 'Defensor Ambiental', 51, 300),
(5, 'Experto del Reciclaje', 101, 600),
(6, 'Heroe Ecologico', 201, 900);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `Id` int(11) NOT NULL,
  `Tipo` varchar(1) NOT NULL,
  `Titulo` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(300) DEFAULT NULL,
  `Imagen` varchar(350) DEFAULT NULL,
  `Link` varchar(350) DEFAULT NULL,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `UsuarioModerador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`Id`, `Tipo`, `Titulo`, `Descripcion`, `Imagen`, `Link`, `Fecha`, `UsuarioModerador`) VALUES
(3, 'N', 'ACCIONA Energía y Aruba firman un acuerdo', 'ACCIONA Energía trabajará con las energéticas estatales para desarrollar, construir y operar una planta de hidrógeno verde alimentada por un proyecto de autoconsumo renovable', 'https://via.placeholder.com/400x300.jpg', 'https://www.acciona.com/es/actualidad/noticias/acciona-energia-y-aruba-firman-acuerdo-impulsar-valle-hidrogeno-verde/?_adin=02021864894', '2024-05-01 00:00:00', 2),
(4, 'A', 'Nueva Torre Creada: Torre Andares', 'Se ha instalado una nueva torre de carga para el uso de nuestro usuarios, revisala en el mapa', NULL, NULL, '2024-05-27 00:00:00', NULL),
(5, 'A', 'Nueva Torre Creada: Torre El Fortin', 'Se ha instalado una nueva torre de carga para el uso de nuestro usuarios, revisala en el mapa', NULL, NULL, '2024-05-29 00:00:00', NULL),
(6, 'A', 'Nueva Torre Creada: Nueva Torre', 'Se ha instalado una nueva torre de carga para el uso de nuestro usuarios, revisala en el mapa', NULL, NULL, '2024-05-29 00:00:00', NULL),
(9, 'A', 'Otra actualizacion', 'Otra actualizacion', NULL, NULL, '2024-05-29 18:44:19', 2),
(10, 'A', 'Nueva Actualizacion', 'Nueva ACT', NULL, NULL, '2024-05-30 09:17:54', 2),
(11, 'A', 'Nueva', 'Nueva', NULL, NULL, '2024-05-30 09:22:06', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `Id` int(11) NOT NULL,
  `UsuarioNormal` int(11) DEFAULT NULL,
  `Botella` tinyint(4) DEFAULT NULL,
  `Salida` int(11) DEFAULT NULL,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `Codigo` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`Id`, `UsuarioNormal`, `Botella`, `Salida`, `Fecha`, `Codigo`) VALUES
(1, 2, 1, 1, '2024-05-04 00:00:00', ''),
(2, 2, 1, 1, '2024-05-04 00:00:00', ''),
(4, 2, 1, 4, '2024-05-05 00:00:00', ''),
(5, 2, 4, 5, '2024-05-16 00:00:00', ''),
(6, 2, 3, 5, '2024-05-16 00:00:00', ''),
(7, 2, 4, 5, '2024-05-16 00:00:00', ''),
(8, 3, 4, 5, '2024-05-16 00:00:00', ''),
(9, 3, 4, 6, '2024-05-16 00:00:00', ''),
(10, 3, 4, 1, '2024-05-16 00:00:00', ''),
(11, 3, 4, 2, '2024-05-16 00:00:00', ''),
(12, 3, 3, 2, '2024-05-16 00:00:00', ''),
(13, 3, 2, 5, '2024-05-16 00:00:00', ''),
(14, 3, 2, 2, '2024-05-16 00:00:00', ''),
(15, 2, 1, 1, '2024-05-16 00:00:00', ''),
(16, 2, 2, 1, '2024-05-16 00:00:00', ''),
(17, 2, 3, 1, '2024-05-16 00:00:00', ''),
(18, 2, 3, 8, '2024-05-16 00:00:00', ''),
(19, 2, 2, 2, '2024-05-15 00:00:00', ''),
(20, 3, 1, 4, '2024-03-12 00:00:00', ''),
(21, 16, 4, 7, '2024-01-25 00:00:00', ''),
(22, 2, 3, 1, '2024-04-08 00:00:00', ''),
(23, 3, 2, 5, '2024-02-10 00:00:00', ''),
(24, 16, 1, 3, '2024-05-02 00:00:00', ''),
(25, 2, 4, 6, '2024-03-05 00:00:00', ''),
(26, 3, 3, 8, '2024-04-15 00:00:00', ''),
(27, 16, 2, 2, '2024-02-27 00:00:00', ''),
(28, 2, 1, 7, '2024-03-29 00:00:00', ''),
(29, 3, 4, 1, '2024-01-13 00:00:00', ''),
(30, 16, 3, 5, '2024-02-20 00:00:00', ''),
(31, 2, 2, 4, '2024-05-05 00:00:00', ''),
(32, 3, 1, 6, '2024-04-21 00:00:00', ''),
(33, 16, 4, 3, '2024-03-15 00:00:00', ''),
(34, 2, 3, 2, '2024-01-31 00:00:00', ''),
(35, 3, 2, 8, '2024-02-25 00:00:00', ''),
(36, 16, 1, 5, '2024-04-11 00:00:00', ''),
(37, 2, 4, 7, '2024-01-05 00:00:00', ''),
(38, 3, 3, 6, '2024-03-19 00:00:00', ''),
(39, 16, 2, 4, '2024-02-14 00:00:00', ''),
(40, 2, 1, 3, '2024-05-10 00:00:00', ''),
(41, 3, 4, 8, '2024-03-27 00:00:00', ''),
(42, 16, 3, 7, '2024-04-03 00:00:00', ''),
(43, 2, 2, 5, '2024-01-22 00:00:00', ''),
(44, 3, 1, 2, '2024-02-18 00:00:00', ''),
(45, 16, 4, 6, '2024-04-25 00:00:00', ''),
(46, 2, 3, 4, '2024-03-11 00:00:00', ''),
(47, 3, 2, 7, '2024-01-17 00:00:00', ''),
(48, 16, 1, 1, '2024-02-22 00:00:00', ''),
(49, 2, 4, 8, '2024-03-06 00:00:00', ''),
(50, 3, 3, 5, '2024-04-14 00:00:00', ''),
(51, 16, 2, 3, '2024-01-28 00:00:00', ''),
(52, 2, 1, 6, '2024-02-15 00:00:00', ''),
(53, 3, 4, 2, '2024-05-06 00:00:00', ''),
(54, 16, 3, 8, '2024-04-24 00:00:00', ''),
(55, 2, 2, 7, '2024-01-10 00:00:00', ''),
(56, 3, 1, 5, '2024-02-13 00:00:00', ''),
(57, 16, 4, 4, '2024-03-08 00:00:00', ''),
(58, 2, 3, 2, '2024-04-13 00:00:00', ''),
(59, 3, 2, 6, '2024-01-14 00:00:00', ''),
(60, 16, 1, 8, '2024-02-24 00:00:00', ''),
(61, 2, 4, 1, '2024-05-01 00:00:00', ''),
(62, 3, 3, 7, '2024-03-14 00:00:00', ''),
(63, 16, 2, 5, '2024-01-12 00:00:00', ''),
(64, 2, 1, 4, '2024-04-19 00:00:00', ''),
(65, 3, 4, 3, '2024-02-16 00:00:00', ''),
(66, 16, 3, 6, '2024-03-20 00:00:00', ''),
(67, 2, 2, 8, '2024-01-30 00:00:00', ''),
(68, 3, 1, 7, '2024-04-22 00:00:00', ''),
(69, 16, 4, 2, '2024-02-26 00:00:00', ''),
(70, 2, 3, 5, '2024-03-07 00:00:00', ''),
(71, 3, 2, 4, '2024-01-15 00:00:00', ''),
(72, 16, 1, 6, '2024-04-16 00:00:00', ''),
(73, 2, 4, 7, '2024-02-11 00:00:00', ''),
(74, 3, 3, 2, '2024-01-29 00:00:00', ''),
(75, 16, 2, 1, '2024-03-04 00:00:00', ''),
(76, 2, 1, 3, '2024-04-05 00:00:00', ''),
(77, 3, 4, 8, '2024-02-17 00:00:00', ''),
(78, 16, 3, 7, '2024-01-18 00:00:00', ''),
(79, 2, 2, 6, '2024-04-09 00:00:00', ''),
(80, 3, 1, 5, '2024-03-22 00:00:00', ''),
(81, 16, 4, 4, '2024-02-21 00:00:00', ''),
(82, 2, 3, 8, '2024-01-19 00:00:00', ''),
(83, 3, 2, 7, '2024-04-12 00:00:00', ''),
(84, 16, 1, 2, '2024-03-25 00:00:00', ''),
(85, 2, 4, 1, '2024-02-27 00:00:00', ''),
(86, 3, 3, 4, '2024-01-07 00:00:00', ''),
(87, 16, 2, 5, '2024-04-26 00:00:00', ''),
(88, 2, 1, 3, '2024-02-01 00:00:00', ''),
(89, 3, 4, 6, '2024-01-08 00:00:00', ''),
(90, 16, 3, 2, '2024-03-18 00:00:00', ''),
(91, 2, 2, 8, '2024-02-02 00:00:00', ''),
(92, 3, 1, 7, '2024-04-28 00:00:00', ''),
(93, 16, 4, 5, '2024-01-09 00:00:00', ''),
(94, 2, 3, 4, '2024-02-03 00:00:00', ''),
(95, 3, 2, 6, '2024-04-30 00:00:00', ''),
(96, 16, 1, 1, '2024-01-11 00:00:00', ''),
(97, 2, 4, 3, '2024-02-04 00:00:00', ''),
(98, 3, 3, 5, '2024-04-27 00:00:00', ''),
(99, 16, 2, 8, '2024-01-13 00:00:00', ''),
(100, 2, 1, 2, '2024-02-05 00:00:00', ''),
(101, 3, 4, 7, '2024-04-23 00:00:00', ''),
(102, 16, 3, 6, '2024-01-06 00:00:00', ''),
(103, 2, 2, 1, '2024-02-06 00:00:00', ''),
(104, 3, 1, 4, '2024-04-04 00:00:00', ''),
(105, 16, 4, 3, '2024-01-26 00:00:00', ''),
(106, 2, 3, 8, '2024-02-07 00:00:00', ''),
(107, 3, 2, 5, '2024-04-10 00:00:00', ''),
(108, 16, 1, 7, '2024-01-23 00:00:00', ''),
(109, 2, 4, 2, '2024-02-08 00:00:00', ''),
(110, 3, 3, 6, '2024-04-07 00:00:00', ''),
(111, 16, 2, 4, '2024-01-20 00:00:00', ''),
(112, 2, 1, 5, '2024-02-09 00:00:00', ''),
(113, 3, 4, 1, '2024-04-11 00:00:00', ''),
(114, 16, 3, 8, '2024-01-27 00:00:00', ''),
(115, 2, 2, 3, '2024-02-12 00:00:00', ''),
(116, 3, 1, 7, '2024-04-02 00:00:00', ''),
(117, 16, 4, 6, '2024-01-24 00:00:00', ''),
(118, 2, 3, 5, '2024-03-21 00:00:00', ''),
(119, 3, 2, 2, '2024-01-21 00:00:00', ''),
(120, 16, 1, 4, '2024-02-19 00:00:00', ''),
(121, 2, 4, 8, '2024-03-17 00:00:00', ''),
(122, 3, 3, 6, '2024-01-16 00:00:00', ''),
(123, 16, 2, 1, '2024-02-23 00:00:00', ''),
(124, 2, 1, 7, '2024-03-09 00:00:00', ''),
(125, 3, 4, 3, '2024-01-03 00:00:00', ''),
(126, 16, 3, 5, '2024-02-13 00:00:00', ''),
(127, 2, 2, 6, '2024-03-13 00:00:00', ''),
(128, 3, 1, 8, '2024-01-01 00:00:00', ''),
(129, 16, 4, 4, '2024-02-15 00:00:00', ''),
(130, 2, 3, 2, '2024-03-01 00:00:00', ''),
(131, 3, 2, 7, '2024-01-04 00:00:00', ''),
(132, 16, 1, 3, '2024-02-16 00:00:00', ''),
(133, 2, 4, 5, '2024-03-23 00:00:00', ''),
(134, 3, 3, 1, '2024-01-02 00:00:00', ''),
(135, 16, 2, 8, '2024-02-18 00:00:00', ''),
(136, 2, 1, 4, '2024-03-02 00:00:00', ''),
(137, 3, 4, 7, '2024-01-31 00:00:00', ''),
(138, 16, 3, 6, '2024-02-20 00:00:00', ''),
(139, 2, 2, 3, '2024-03-03 00:00:00', ''),
(140, 3, 1, 5, '2024-01-12 00:00:00', ''),
(141, 16, 4, 2, '2024-02-22 00:00:00', ''),
(142, 2, 3, 4, '2024-03-05 00:00:00', ''),
(143, 3, 2, 6, '2024-01-10 00:00:00', ''),
(144, 16, 1, 7, '2024-02-26 00:00:00', ''),
(145, 2, 4, 1, '2024-03-28 00:00:00', ''),
(146, 3, 3, 8, '2024-01-14 00:00:00', ''),
(147, 16, 2, 5, '2024-02-24 00:00:00', ''),
(148, 2, 1, 2, '2024-03-04 00:00:00', ''),
(149, 3, 4, 6, '2024-01-17 00:00:00', ''),
(150, 16, 3, 3, '2024-02-28 00:00:00', ''),
(151, 2, 2, 1, '2024-03-10 00:00:00', ''),
(152, 3, 1, 4, '2024-01-19 00:00:00', ''),
(153, 16, 4, 5, '2024-02-25 00:00:00', ''),
(154, 2, 3, 7, '2024-03-12 00:00:00', ''),
(155, 3, 2, 8, '2024-01-20 00:00:00', ''),
(156, 16, 1, 6, '2024-02-23 00:00:00', ''),
(157, 2, 4, 3, '2024-03-18 00:00:00', ''),
(158, 3, 3, 2, '2024-01-29 00:00:00', ''),
(159, 16, 2, 4, '2024-02-27 00:00:00', ''),
(160, 2, 1, 8, '2024-03-20 00:00:00', ''),
(161, 3, 4, 5, '2024-01-07 00:00:00', ''),
(162, 16, 3, 1, '2024-02-11 00:00:00', ''),
(163, 2, 2, 6, '2024-03-19 00:00:00', ''),
(164, 3, 1, 7, '2024-01-30 00:00:00', ''),
(165, 16, 4, 2, '2024-02-14 00:00:00', ''),
(166, 2, 3, 4, '2024-03-22 00:00:00', ''),
(167, 3, 2, 5, '2024-01-11 00:00:00', ''),
(168, 16, 1, 3, '2024-02-16 00:00:00', ''),
(169, 2, 4, 1, '2024-03-25 00:00:00', ''),
(170, 3, 3, 8, '2024-01-13 00:00:00', ''),
(171, 16, 2, 7, '2024-02-10 00:00:00', ''),
(172, 2, 1, 2, '2024-03-24 00:00:00', ''),
(173, 3, 4, 4, '2024-01-21 00:00:00', ''),
(174, 16, 3, 6, '2024-02-12 00:00:00', ''),
(175, 2, 2, 5, '2024-03-26 00:00:00', ''),
(176, 3, 1, 1, '2024-01-08 00:00:00', ''),
(177, 16, 4, 3, '2024-02-08 00:00:00', ''),
(194, 2, 2, 2, '2024-05-26 00:00:00', ''),
(195, 2, 2, 2, '2023-05-15 00:00:00', ''),
(196, 3, 1, 4, '2023-06-12 00:00:00', ''),
(197, 16, 4, 7, '2023-07-25 00:00:00', ''),
(198, 2, 3, 1, '2023-08-08 00:00:00', ''),
(199, 3, 2, 5, '2023-09-10 00:00:00', ''),
(200, 16, 1, 3, '2023-10-02 00:00:00', ''),
(201, 2, 4, 6, '2023-11-05 00:00:00', ''),
(202, 3, 3, 8, '2023-05-15 00:00:00', ''),
(203, 16, 2, 2, '2023-06-27 00:00:00', ''),
(204, 2, 1, 7, '2023-07-29 00:00:00', ''),
(205, 3, 4, 1, '2023-08-13 00:00:00', ''),
(206, 16, 3, 5, '2023-09-20 00:00:00', ''),
(207, 2, 2, 4, '2023-10-05 00:00:00', ''),
(208, 3, 1, 6, '2023-11-21 00:00:00', ''),
(209, 16, 4, 3, '2023-05-15 00:00:00', ''),
(210, 2, 3, 2, '2023-06-30 00:00:00', ''),
(211, 3, 2, 8, '2023-07-25 00:00:00', ''),
(212, 16, 1, 5, '2023-08-11 00:00:00', ''),
(213, 2, 4, 7, '2023-09-05 00:00:00', ''),
(214, 3, 3, 6, '2023-10-19 00:00:00', ''),
(215, 16, 2, 4, '2023-11-14 00:00:00', ''),
(216, 2, 1, 3, '2023-05-10 00:00:00', ''),
(217, 3, 4, 8, '2023-06-27 00:00:00', ''),
(218, 16, 3, 7, '2023-07-03 00:00:00', ''),
(219, 2, 2, 5, '2023-08-22 00:00:00', ''),
(220, 3, 1, 2, '2023-09-18 00:00:00', ''),
(221, 16, 4, 6, '2023-10-25 00:00:00', ''),
(222, 2, 3, 4, '2023-11-11 00:00:00', ''),
(223, 3, 2, 7, '2023-05-17 00:00:00', ''),
(224, 16, 1, 1, '2023-06-22 00:00:00', ''),
(225, 2, 4, 8, '2023-07-06 00:00:00', ''),
(226, 3, 3, 5, '2023-08-14 00:00:00', ''),
(227, 16, 2, 3, '2023-09-28 00:00:00', ''),
(228, 2, 1, 6, '2023-10-15 00:00:00', ''),
(229, 3, 4, 2, '2023-11-06 00:00:00', ''),
(230, 16, 3, 8, '2023-05-24 00:00:00', ''),
(231, 2, 2, 7, '2023-06-10 00:00:00', ''),
(232, 3, 1, 5, '2023-07-13 00:00:00', ''),
(233, 16, 4, 4, '2023-08-08 00:00:00', ''),
(234, 2, 3, 2, '2023-09-13 00:00:00', ''),
(235, 3, 2, 6, '2023-10-14 00:00:00', ''),
(236, 16, 1, 8, '2023-11-04 00:00:00', ''),
(237, 2, 4, 1, '2023-05-01 00:00:00', ''),
(238, 3, 3, 7, '2023-06-14 00:00:00', ''),
(239, 16, 2, 5, '2023-07-12 00:00:00', ''),
(240, 2, 1, 4, '2023-08-19 00:00:00', ''),
(241, 3, 4, 3, '2023-09-16 00:00:00', ''),
(242, 16, 3, 6, '2023-10-20 00:00:00', ''),
(243, 2, 2, 8, '2023-11-14 00:00:00', ''),
(244, 3, 1, 7, '2023-05-22 00:00:00', ''),
(245, 16, 4, 2, '2023-06-26 00:00:00', ''),
(246, 2, 3, 5, '2023-07-07 00:00:00', ''),
(247, 3, 2, 4, '2023-08-15 00:00:00', ''),
(248, 16, 1, 6, '2023-09-11 00:00:00', ''),
(249, 2, 4, 7, '2023-10-11 00:00:00', ''),
(250, 3, 3, 2, '2023-11-29 00:00:00', ''),
(251, 16, 2, 1, '2023-05-09 00:00:00', ''),
(252, 2, 1, 3, '2023-06-15 00:00:00', ''),
(253, 3, 4, 8, '2023-07-17 00:00:00', ''),
(254, 16, 3, 7, '2023-08-03 00:00:00', ''),
(255, 2, 2, 6, '2023-09-09 00:00:00', ''),
(256, 3, 1, 5, '2023-10-10 00:00:00', ''),
(257, 16, 4, 4, '2023-11-08 00:00:00', ''),
(258, 2, 3, 2, '2023-05-13 00:00:00', ''),
(259, 3, 2, 8, '2023-06-18 00:00:00', ''),
(260, 16, 1, 5, '2023-07-22 00:00:00', ''),
(261, 2, 4, 1, '2023-08-26 00:00:00', ''),
(262, 3, 3, 7, '2023-09-12 00:00:00', ''),
(263, 16, 2, 6, '2023-10-23 00:00:00', ''),
(264, 2, 1, 4, '2023-11-03 00:00:00', ''),
(265, 3, 4, 5, '2023-05-15 00:00:00', ''),
(266, 16, 3, 8, '2023-06-20 00:00:00', ''),
(267, 2, 2, 7, '2023-07-04 00:00:00', ''),
(268, 3, 1, 6, '2023-08-24 00:00:00', ''),
(269, 16, 4, 3, '2023-09-30 00:00:00', ''),
(270, 2, 3, 5, '2023-10-13 00:00:00', ''),
(271, 3, 2, 2, '2023-11-17 00:00:00', ''),
(272, 16, 1, 4, '2023-05-02 00:00:00', ''),
(273, 2, 4, 8, '2023-06-17 00:00:00', ''),
(274, 3, 3, 6, '2023-07-19 00:00:00', ''),
(275, 16, 2, 1, '2023-08-16 00:00:00', ''),
(276, 2, 1, 7, '2023-09-22 00:00:00', ''),
(277, 3, 4, 3, '2023-10-07 00:00:00', ''),
(278, 16, 3, 5, '2023-11-10 00:00:00', ''),
(279, 2, 2, 6, '2023-05-27 00:00:00', ''),
(280, 3, 1, 8, '2023-06-16 00:00:00', ''),
(281, 16, 4, 4, '2023-07-21 00:00:00', ''),
(282, 2, 3, 2, '2023-08-10 00:00:00', ''),
(283, 3, 2, 7, '2023-09-15 00:00:00', ''),
(284, 16, 1, 3, '2023-10-12 00:00:00', ''),
(285, 2, 4, 5, '2023-11-16 00:00:00', ''),
(286, 3, 3, 1, '2023-05-25 00:00:00', ''),
(287, 16, 2, 8, '2023-06-24 00:00:00', ''),
(288, 2, 1, 4, '2023-07-05 00:00:00', ''),
(289, 3, 4, 7, '2023-08-20 00:00:00', ''),
(290, 16, 3, 6, '2023-09-08 00:00:00', ''),
(291, 2, 2, 3, '2023-10-01 00:00:00', ''),
(292, 3, 1, 5, '2023-11-09 00:00:00', ''),
(293, 16, 4, 2, '2023-05-23 00:00:00', ''),
(294, 2, 3, 4, '2023-06-19 00:00:00', ''),
(295, 3, 2, 6, '2023-07-15 00:00:00', ''),
(296, 16, 1, 7, '2023-08-09 00:00:00', ''),
(297, 2, 4, 1, '2023-09-04 00:00:00', ''),
(298, 3, 3, 8, '2023-10-08 00:00:00', ''),
(299, 16, 2, 5, '2023-11-04 00:00:00', ''),
(300, 2, 1, 2, '2023-05-12 00:00:00', ''),
(301, 3, 4, 6, '2023-06-15 00:00:00', ''),
(302, 16, 3, 3, '2023-07-11 00:00:00', ''),
(303, 2, 2, 1, '2023-08-04 00:00:00', ''),
(304, 3, 1, 4, '2023-09-05 00:00:00', ''),
(305, 16, 4, 5, '2023-10-15 00:00:00', ''),
(306, 2, 3, 7, '2023-11-03 00:00:00', ''),
(307, 3, 2, 8, '2023-05-14 00:00:00', ''),
(308, 16, 1, 6, '2023-06-29 00:00:00', ''),
(309, 2, 4, 3, '2023-07-10 00:00:00', ''),
(310, 3, 3, 2, '2023-08-11 00:00:00', ''),
(311, 16, 2, 4, '2023-09-13 00:00:00', ''),
(312, 2, 1, 8, '2023-10-26 00:00:00', ''),
(313, 3, 4, 5, '2023-11-02 00:00:00', ''),
(314, 16, 3, 1, '2023-05-19 00:00:00', ''),
(315, 2, 2, 6, '2023-06-23 00:00:00', ''),
(316, 3, 1, 7, '2023-07-18 00:00:00', ''),
(317, 16, 4, 2, '2023-08-27 00:00:00', ''),
(318, 2, 3, 4, '2023-09-01 00:00:00', ''),
(319, 3, 2, 5, '2023-10-19 00:00:00', ''),
(320, 16, 1, 3, '2023-11-01 00:00:00', ''),
(321, 2, 4, 1, '2023-05-18 00:00:00', ''),
(322, 3, 3, 8, '2023-06-28 00:00:00', ''),
(323, 16, 2, 7, '2023-07-09 00:00:00', ''),
(324, 2, 1, 2, '2023-08-12 00:00:00', ''),
(325, 3, 4, 6, '2023-09-27 00:00:00', ''),
(326, 16, 3, 5, '2023-10-09 00:00:00', ''),
(327, 2, 2, 1, '2023-11-05 00:00:00', ''),
(328, 3, 1, 4, '2023-05-16 00:00:00', ''),
(329, 16, 4, 7, '2023-06-22 00:00:00', ''),
(330, 2, 3, 3, '2023-07-11 00:00:00', ''),
(331, 3, 2, 8, '2023-08-05 00:00:00', ''),
(332, 16, 1, 6, '2023-09-03 00:00:00', ''),
(333, 2, 4, 5, '2023-10-24 00:00:00', ''),
(334, 3, 3, 2, '2023-11-02 00:00:00', ''),
(335, 16, 2, 4, '2023-05-21 00:00:00', ''),
(336, 2, 1, 7, '2023-06-13 00:00:00', ''),
(337, 3, 4, 1, '2023-07-20 00:00:00', ''),
(338, 16, 3, 8, '2023-08-17 00:00:00', ''),
(339, 2, 2, 3, '2023-09-10 00:00:00', ''),
(340, 3, 1, 6, '2023-10-03 00:00:00', ''),
(341, 16, 4, 5, '2023-11-15 00:00:00', ''),
(342, 2, 3, 2, '2023-05-11 00:00:00', ''),
(343, 3, 2, 7, '2023-06-21 00:00:00', ''),
(344, 16, 1, 4, '2023-07-02 00:00:00', ''),
(345, 2, 4, 1, '2023-08-18 00:00:00', ''),
(346, 3, 3, 8, '2023-09-29 00:00:00', ''),
(347, 16, 2, 5, '2023-10-02 00:00:00', ''),
(348, 2, 1, 6, '2023-11-11 00:00:00', ''),
(349, 3, 4, 7, '2023-05-29 00:00:00', ''),
(350, 16, 3, 3, '2023-06-20 00:00:00', ''),
(351, 2, 2, 8, '2023-07-24 00:00:00', ''),
(352, 3, 1, 4, '2023-08-02 00:00:00', ''),
(353, 16, 4, 5, '2023-09-19 00:00:00', ''),
(354, 2, 3, 6, '2023-10-21 00:00:00', ''),
(355, 3, 2, 1, '2023-11-09 00:00:00', ''),
(356, 16, 1, 2, '2023-05-03 00:00:00', ''),
(357, 2, 4, 7, '2023-06-30 00:00:00', ''),
(358, 3, 3, 5, '2023-07-30 00:00:00', ''),
(359, 16, 2, 6, '2023-08-21 00:00:00', ''),
(360, 2, 1, 4, '2023-09-14 00:00:00', ''),
(361, 3, 4, 3, '2023-10-18 00:00:00', ''),
(362, 16, 3, 8, '2023-11-12 00:00:00', ''),
(363, 2, 2, 5, '2023-05-31 00:00:00', ''),
(364, 3, 1, 7, '2023-06-01 00:00:00', ''),
(365, 16, 4, 2, '2023-07-14 00:00:00', ''),
(366, 2, 3, 6, '2023-08-22 00:00:00', ''),
(367, 3, 2, 4, '2023-09-20 00:00:00', ''),
(368, 16, 1, 8, '2023-10-04 00:00:00', '');

--
-- Disparadores `registro`
--
DELIMITER $$
CREATE TRIGGER `GenerarCodigo` BEFORE INSERT ON `registro` FOR EACH ROW BEGIN
    DECLARE nuevo_codigo VARCHAR(4);
    DECLARE codigo_existente INT;
    SET codigo_existente = 1;
    
    WHILE codigo_existente > 0 DO
        SET nuevo_codigo = LPAD(FLOOR(RAND() * 10000), 4, '0');
        SELECT COUNT(*) INTO codigo_existente FROM salidas WHERE Codigo = nuevo_codigo;
    END WHILE;

    IF (SELECT Estado FROM salidas WHERE Id = NEW.Salida) = 'D' THEN
        UPDATE salidas SET Codigo = nuevo_codigo WHERE Id = NEW.Salida;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `SumarMinutosAlUsuario` AFTER INSERT ON `registro` FOR EACH ROW BEGIN
  
  DECLARE segundosDeBotella INT;
  DECLARE tiempoActual INT;
  
  
  SELECT Segundos INTO segundosDeBotella
  FROM botellaslatas
  WHERE Id = NEW.Botella;
  
  
  SELECT Tiempo INTO tiempoActual
  FROM usuariosnormales
  WHERE Registro = NEW.UsuarioNormal;
  
  
  UPDATE usuariosnormales
  SET Tiempo = tiempoActual + segundosDeBotella
  WHERE Registro = NEW.UsuarioNormal;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_registro` AFTER INSERT ON `registro` FOR EACH ROW BEGIN
    DECLARE count_registros INT;
    DECLARE current_level INT;
    DECLARE next_level INT;
    DECLARE min_quantity_next_level INT;

    
    SELECT COUNT(*) INTO count_registros 
    FROM registro WHERE DATE_FORMAT(Fecha, '%Y-%m') 	= DATE_FORMAT(NOW(), '%Y-%m') AND UsuarioNormal = 		NEW.UsuarioNormal;
    
    SELECT Nivel INTO current_level
    FROM usuariosnormales
    WHERE Registro = NEW.UsuarioNormal;

    
    SET next_level = current_level + 1;

    
    SELECT CantidadMinima INTO min_quantity_next_level
    FROM nivelusuario
    WHERE Id = next_level;

    
    IF count_registros >= min_quantity_next_level THEN
        
        UPDATE usuariosnormales
        SET Nivel = next_level
        WHERE Registro = NEW.UsuarioNormal;
    END IF;
    
    UPDATE registro SET Codigo = (SELECT Codigo FROM salidas WHERE Id = registro.Salida);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

CREATE TABLE `salidas` (
  `Id` int(11) NOT NULL,
  `Numero` tinyint(1) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  `Codigo` int(4) DEFAULT NULL,
  `TorreCarga` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salidas`
--

INSERT INTO `salidas` (`Id`, `Numero`, `Estado`, `Codigo`, `TorreCarga`) VALUES
(1, 1, 'D', 0, 22),
(2, 2, 'A', 9921, 22),
(3, 3, 'A', 9835, 22),
(4, 4, 'D', 0, 22),
(5, 1, 'D', 0, 24),
(6, 2, 'D', 0, 24),
(7, 3, 'D', 0, 24),
(8, 4, 'D', 0, 24),
(9, 1, 'D', 0, 25),
(10, 2, 'D', 0, 25),
(11, 3, 'D', 0, 25),
(12, 4, 'D', 0, 25),
(13, 1, 'D', 0, 27),
(14, 2, 'D', 0, 27),
(15, 3, 'D', 0, 27),
(16, 4, 'D', 0, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `Id` int(11) NOT NULL,
  `Codigo` varchar(10) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  `UsuarioNormal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torrecarga`
--

CREATE TABLE `torrecarga` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Coordenadas` point DEFAULT NULL,
  `UsuarioAdministrador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torrecarga`
--

INSERT INTO `torrecarga` (`Id`, `Nombre`, `Coordenadas`, `UsuarioAdministrador`) VALUES
(22, 'Torre Centro GDL', 0x0000000001010000005cab2a42cfaf34404bd4d9cd6ad659c0, 1),
(24, 'Torre Ceti Colomos', 0x00000000010100000086babb90c9b334405c8fb793dad859c0, 1),
(25, 'Torre Andares', 0x000000000101000000e6459af4edb53440838324b65cda59c0, 1),
(27, 'Nueva Torre', 0x00000000010100000055b2eae354af344067ed0aab77d559c0, 1);

--
-- Disparadores `torrecarga`
--
DELIMITER $$
CREATE TRIGGER `AfterInsertTorreCarga` AFTER INSERT ON `torrecarga` FOR EACH ROW BEGIN
  DECLARE new_id INT;
  
  SET new_id = (SELECT COALESCE(MAX(Id), 0) FROM salidas) + 1;
  
  INSERT INTO salidas (Id, Numero, Estado, TorreCarga) VALUES
    (new_id, '1', 'D', NEW.Id),
    (new_id + 1, '2', 'D', NEW.Id),
    (new_id + 2, '3', 'D', NEW.Id),
    (new_id + 3, '4', 'D', NEW.Id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `NovedadAlInsertarTorre` AFTER INSERT ON `torrecarga` FOR EACH ROW BEGIN
    INSERT INTO novedades (Tipo, Titulo, Descripcion, Imagen, Link, UsuarioModerador)
    VALUES (
        'A',
        CONCAT('Nueva Torre Creada: ', NEW.Nombre),
        'Se ha instalado una nueva torre de carga para el uso de nuestro usuarios, revisala en el mapa',
        NULL,
        NULL,
        NULL
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosadministradores`
--

CREATE TABLE `usuariosadministradores` (
  `Registro` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `ApellidoPaterno` varchar(50) DEFAULT NULL,
  `ApellidoMaterno` varchar(50) DEFAULT NULL,
  `Celular` varchar(10) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `FechaCreacion` date DEFAULT current_timestamp(),
  `Credencial` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosadministradores`
--

INSERT INTO `usuariosadministradores` (`Registro`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Celular`, `Correo`, `FechaCreacion`, `Credencial`) VALUES
(1, 'Rodrigo', 'Romero', 'Corvera', '3316346586', 'a20300699@ceti.mx', '2024-03-22', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosmoderadores`
--

CREATE TABLE `usuariosmoderadores` (
  `Registro` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `ApellidoPaterno` varchar(50) DEFAULT NULL,
  `ApellidoMaterno` varchar(50) DEFAULT NULL,
  `Celular` varchar(10) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `FechaCreacion` date DEFAULT current_timestamp(),
  `Credencial` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosmoderadores`
--

INSERT INTO `usuariosmoderadores` (`Registro`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Celular`, `Correo`, `FechaCreacion`, `Credencial`) VALUES
(2, 'Albert', 'Wachi', 'Pena', '3387654321', 'a20300686@ceti.mx', NULL, 5),
(5, 'Diego', 'Romero', 'Corvera', '3312345678', 'diegobros2105@gmail.com', NULL, 6),
(9, 'Rodrigo', 'Romero', 'Corvera', '3316346586', 'rocobros21@gmail.com', '2024-05-29', 66);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosnormales`
--

CREATE TABLE `usuariosnormales` (
  `Registro` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `ApellidoPaterno` varchar(50) DEFAULT NULL,
  `ApellidoMaterno` varchar(50) DEFAULT NULL,
  `Celular` varchar(10) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `FechaCreacion` date DEFAULT current_timestamp(),
  `Tiempo` int(11) NOT NULL DEFAULT 0,
  `Estado` varchar(1) NOT NULL DEFAULT 'D',
  `Notificaciones` varchar(1) NOT NULL DEFAULT 'D',
  `Nivel` tinyint(4) NOT NULL DEFAULT 2,
  `Credencial` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosnormales`
--

INSERT INTO `usuariosnormales` (`Registro`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Celular`, `Correo`, `FechaCreacion`, `Tiempo`, `Estado`, `Notificaciones`, `Nivel`, `Credencial`) VALUES
(2, 'Rodrigo', 'Romero', 'Romero', '3312345678', 'rocobros21@gmail.com', '2024-03-15', 350, 'A', 'D', 2, 1),
(3, 'Diego', 'Romero', 'Corvera', '3338465252', 'diego2105@gmail.com', '2024-03-15', 350, 'A', 'D', 2, 2),
(16, 'Monica', 'Corvera', 'Romo', '3318107819', 'monicorverar@gmail.com', '2024-04-17', 350, 'D', 'D', 2, 29),
(37, 'Susana', 'Ferrer', 'Hernandez', '1234567890', 'a20300699@ceti.mx', '2024-05-17', 350, 'A', 'D', 2, 65);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `botellaslatas`
--
ALTER TABLE `botellaslatas`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `chatbot`
--
ALTER TABLE `chatbot`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UsuarioModerador` (`UsuarioModerador`),
  ADD KEY `UsuarioNormal` (`UsuarioNormal`);

--
-- Indices de la tabla `credenciales`
--
ALTER TABLE `credenciales`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `nivelusuario`
--
ALTER TABLE `nivelusuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UsuarioModerador` (`UsuarioModerador`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Botella` (`Botella`),
  ADD KEY `Salida` (`Salida`),
  ADD KEY `registro_ibfk_2` (`UsuarioNormal`);

--
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `TorreCarga` (`TorreCarga`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_UsuarioNormal` (`UsuarioNormal`);

--
-- Indices de la tabla `torrecarga`
--
ALTER TABLE `torrecarga`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UsuarioAdministrador` (`UsuarioAdministrador`);

--
-- Indices de la tabla `usuariosadministradores`
--
ALTER TABLE `usuariosadministradores`
  ADD PRIMARY KEY (`Registro`),
  ADD KEY `Credencial` (`Credencial`);

--
-- Indices de la tabla `usuariosmoderadores`
--
ALTER TABLE `usuariosmoderadores`
  ADD PRIMARY KEY (`Registro`),
  ADD KEY `Credencial` (`Credencial`);

--
-- Indices de la tabla `usuariosnormales`
--
ALTER TABLE `usuariosnormales`
  ADD PRIMARY KEY (`Registro`),
  ADD KEY `Nivel` (`Nivel`),
  ADD KEY `Credencial` (`Credencial`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `botellaslatas`
--
ALTER TABLE `botellaslatas`
  MODIFY `Id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `chatbot`
--
ALTER TABLE `chatbot`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `credenciales`
--
ALTER TABLE `credenciales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `nivelusuario`
--
ALTER TABLE `nivelusuario`
  MODIFY `Id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=380;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `torrecarga`
--
ALTER TABLE `torrecarga`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuariosadministradores`
--
ALTER TABLE `usuariosadministradores`
  MODIFY `Registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuariosmoderadores`
--
ALTER TABLE `usuariosmoderadores`
  MODIFY `Registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuariosnormales`
--
ALTER TABLE `usuariosnormales`
  MODIFY `Registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chatbot`
--
ALTER TABLE `chatbot`
  ADD CONSTRAINT `chatbot_ibfk_1` FOREIGN KEY (`UsuarioModerador`) REFERENCES `usuariosmoderadores` (`Registro`),
  ADD CONSTRAINT `chatbot_ibfk_2` FOREIGN KEY (`UsuarioNormal`) REFERENCES `usuariosnormales` (`Registro`);

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `novedades_ibfk_1` FOREIGN KEY (`UsuarioModerador`) REFERENCES `usuariosmoderadores` (`Registro`);

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`Salida`) REFERENCES `salidas` (`Id`),
  ADD CONSTRAINT `registro_ibfk_2` FOREIGN KEY (`UsuarioNormal`) REFERENCES `usuariosnormales` (`Registro`),
  ADD CONSTRAINT `registro_ibfk_3` FOREIGN KEY (`Botella`) REFERENCES `botellaslatas` (`Id`);

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`TorreCarga`) REFERENCES `torrecarga` (`Id`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`UsuarioNormal`) REFERENCES `usuariosnormales` (`Registro`);

--
-- Filtros para la tabla `torrecarga`
--
ALTER TABLE `torrecarga`
  ADD CONSTRAINT `torrescarga_ibfk_1` FOREIGN KEY (`UsuarioAdministrador`) REFERENCES `usuariosadministradores` (`Registro`);

--
-- Filtros para la tabla `usuariosadministradores`
--
ALTER TABLE `usuariosadministradores`
  ADD CONSTRAINT `usuariosadministradores_ibfk_1` FOREIGN KEY (`Credencial`) REFERENCES `credenciales` (`Id`);

--
-- Filtros para la tabla `usuariosmoderadores`
--
ALTER TABLE `usuariosmoderadores`
  ADD CONSTRAINT `usuariosmoderadores_ibfk_1` FOREIGN KEY (`Credencial`) REFERENCES `credenciales` (`Id`);

--
-- Filtros para la tabla `usuariosnormales`
--
ALTER TABLE `usuariosnormales`
  ADD CONSTRAINT `usuariosnormales_ibfk_1` FOREIGN KEY (`Nivel`) REFERENCES `nivelusuario` (`Id`),
  ADD CONSTRAINT `usuariosnormales_ibfk_2` FOREIGN KEY (`Credencial`) REFERENCES `credenciales` (`Id`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `BorrarTokens` ON SCHEDULE EVERY 5 MINUTE STARTS '2024-05-04 21:56:28' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM tokens$$

CREATE DEFINER=`root`@`localhost` EVENT `reset_nivel` ON SCHEDULE EVERY 1 MONTH STARTS '2024-05-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
	UPDATE usuariosnormales u
    JOIN nivelusuario n ON u.Nivel = n.Id
    SET u.Tiempo = u.Tiempo + n.SegundosAlMes;

    UPDATE usuariosnormales
    SET Nivel = DEFAULT(Nivel);
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
