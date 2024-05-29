-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 03:16:44
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
(65, 'Susana123', '$2a$10$95hi84Bg0uVVS/t385oo.uF7.hSDSY2AbQ6BvcgpBDBp3prsYXGhy');

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
  `Fecha` date NOT NULL DEFAULT current_timestamp(),
  `UsuarioModerador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`Id`, `Tipo`, `Titulo`, `Descripcion`, `Imagen`, `Link`, `Fecha`, `UsuarioModerador`) VALUES
(3, 'N', 'ACCIONA Energía y Aruba firman un acuerdo', 'ACCIONA Energía trabajará con las energéticas estatales para desarrollar, construir y operar una planta de hidrógeno verde alimentada por un proyecto de autoconsumo renovable', 'https://shorturl.at/B3DUf', 'https://www.acciona.com/es/actualidad/noticias/acciona-energia-y-aruba-firman-acuerdo-impulsar-valle-hidrogeno-verde/?_adin=02021864894', '2024-05-01', 2),
(4, 'A', 'Nueva Torre Creada: Torre Andares', 'Se ha instalado una nueva torre de carga para el uso de nuestro usuarios, revisala en el mapa', NULL, NULL, '2024-05-27', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `Id` int(11) NOT NULL,
  `UsuarioNormal` int(11) DEFAULT NULL,
  `Botella` tinyint(4) DEFAULT NULL,
  `Salida` int(11) DEFAULT NULL,
  `Fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`Id`, `UsuarioNormal`, `Botella`, `Salida`, `Fecha`) VALUES
(1, 2, 1, 1, '2024-05-04'),
(2, 2, 1, 1, '2024-05-04'),
(4, 2, 1, 4, '2024-05-05'),
(5, 2, 4, 5, '2024-05-16'),
(6, 2, 3, 5, '2024-05-16'),
(7, 2, 4, 5, '2024-05-16'),
(8, 3, 4, 5, '2024-05-16'),
(9, 3, 4, 6, '2024-05-16'),
(10, 3, 4, 1, '2024-05-16'),
(11, 3, 4, 2, '2024-05-16'),
(12, 3, 3, 2, '2024-05-16'),
(13, 3, 2, 5, '2024-05-16'),
(14, 3, 2, 2, '2024-05-16'),
(15, 2, 1, 1, '2024-05-16'),
(16, 2, 2, 1, '2024-05-16'),
(17, 2, 3, 1, '2024-05-16'),
(18, 2, 3, 8, '2024-05-16'),
(19, 2, 2, 2, '2024-05-15'),
(20, 3, 1, 4, '2024-03-12'),
(21, 16, 4, 7, '2024-01-25'),
(22, 2, 3, 1, '2024-04-08'),
(23, 3, 2, 5, '2024-02-10'),
(24, 16, 1, 3, '2024-05-02'),
(25, 2, 4, 6, '2024-03-05'),
(26, 3, 3, 8, '2024-04-15'),
(27, 16, 2, 2, '2024-02-27'),
(28, 2, 1, 7, '2024-03-29'),
(29, 3, 4, 1, '2024-01-13'),
(30, 16, 3, 5, '2024-02-20'),
(31, 2, 2, 4, '2024-05-05'),
(32, 3, 1, 6, '2024-04-21'),
(33, 16, 4, 3, '2024-03-15'),
(34, 2, 3, 2, '2024-01-31'),
(35, 3, 2, 8, '2024-02-25'),
(36, 16, 1, 5, '2024-04-11'),
(37, 2, 4, 7, '2024-01-05'),
(38, 3, 3, 6, '2024-03-19'),
(39, 16, 2, 4, '2024-02-14'),
(40, 2, 1, 3, '2024-05-10'),
(41, 3, 4, 8, '2024-03-27'),
(42, 16, 3, 7, '2024-04-03'),
(43, 2, 2, 5, '2024-01-22'),
(44, 3, 1, 2, '2024-02-18'),
(45, 16, 4, 6, '2024-04-25'),
(46, 2, 3, 4, '2024-03-11'),
(47, 3, 2, 7, '2024-01-17'),
(48, 16, 1, 1, '2024-02-22'),
(49, 2, 4, 8, '2024-03-06'),
(50, 3, 3, 5, '2024-04-14'),
(51, 16, 2, 3, '2024-01-28'),
(52, 2, 1, 6, '2024-02-15'),
(53, 3, 4, 2, '2024-05-06'),
(54, 16, 3, 8, '2024-04-24'),
(55, 2, 2, 7, '2024-01-10'),
(56, 3, 1, 5, '2024-02-13'),
(57, 16, 4, 4, '2024-03-08'),
(58, 2, 3, 2, '2024-04-13'),
(59, 3, 2, 6, '2024-01-14'),
(60, 16, 1, 8, '2024-02-24'),
(61, 2, 4, 1, '2024-05-01'),
(62, 3, 3, 7, '2024-03-14'),
(63, 16, 2, 5, '2024-01-12'),
(64, 2, 1, 4, '2024-04-19'),
(65, 3, 4, 3, '2024-02-16'),
(66, 16, 3, 6, '2024-03-20'),
(67, 2, 2, 8, '2024-01-30'),
(68, 3, 1, 7, '2024-04-22'),
(69, 16, 4, 2, '2024-02-26'),
(70, 2, 3, 5, '2024-03-07'),
(71, 3, 2, 4, '2024-01-15'),
(72, 16, 1, 6, '2024-04-16'),
(73, 2, 4, 7, '2024-02-11'),
(74, 3, 3, 2, '2024-01-29'),
(75, 16, 2, 1, '2024-03-04'),
(76, 2, 1, 3, '2024-04-05'),
(77, 3, 4, 8, '2024-02-17'),
(78, 16, 3, 7, '2024-01-18'),
(79, 2, 2, 6, '2024-04-09'),
(80, 3, 1, 5, '2024-03-22'),
(81, 16, 4, 4, '2024-02-21'),
(82, 2, 3, 8, '2024-01-19'),
(83, 3, 2, 7, '2024-04-12'),
(84, 16, 1, 2, '2024-03-25'),
(85, 2, 4, 1, '2024-02-27'),
(86, 3, 3, 4, '2024-01-07'),
(87, 16, 2, 5, '2024-04-26'),
(88, 2, 1, 3, '2024-02-01'),
(89, 3, 4, 6, '2024-01-08'),
(90, 16, 3, 2, '2024-03-18'),
(91, 2, 2, 8, '2024-02-02'),
(92, 3, 1, 7, '2024-04-28'),
(93, 16, 4, 5, '2024-01-09'),
(94, 2, 3, 4, '2024-02-03'),
(95, 3, 2, 6, '2024-04-30'),
(96, 16, 1, 1, '2024-01-11'),
(97, 2, 4, 3, '2024-02-04'),
(98, 3, 3, 5, '2024-04-27'),
(99, 16, 2, 8, '2024-01-13'),
(100, 2, 1, 2, '2024-02-05'),
(101, 3, 4, 7, '2024-04-23'),
(102, 16, 3, 6, '2024-01-06'),
(103, 2, 2, 1, '2024-02-06'),
(104, 3, 1, 4, '2024-04-04'),
(105, 16, 4, 3, '2024-01-26'),
(106, 2, 3, 8, '2024-02-07'),
(107, 3, 2, 5, '2024-04-10'),
(108, 16, 1, 7, '2024-01-23'),
(109, 2, 4, 2, '2024-02-08'),
(110, 3, 3, 6, '2024-04-07'),
(111, 16, 2, 4, '2024-01-20'),
(112, 2, 1, 5, '2024-02-09'),
(113, 3, 4, 1, '2024-04-11'),
(114, 16, 3, 8, '2024-01-27'),
(115, 2, 2, 3, '2024-02-12'),
(116, 3, 1, 7, '2024-04-02'),
(117, 16, 4, 6, '2024-01-24'),
(118, 2, 3, 5, '2024-03-21'),
(119, 3, 2, 2, '2024-01-21'),
(120, 16, 1, 4, '2024-02-19'),
(121, 2, 4, 8, '2024-03-17'),
(122, 3, 3, 6, '2024-01-16'),
(123, 16, 2, 1, '2024-02-23'),
(124, 2, 1, 7, '2024-03-09'),
(125, 3, 4, 3, '2024-01-03'),
(126, 16, 3, 5, '2024-02-13'),
(127, 2, 2, 6, '2024-03-13'),
(128, 3, 1, 8, '2024-01-01'),
(129, 16, 4, 4, '2024-02-15'),
(130, 2, 3, 2, '2024-03-01'),
(131, 3, 2, 7, '2024-01-04'),
(132, 16, 1, 3, '2024-02-16'),
(133, 2, 4, 5, '2024-03-23'),
(134, 3, 3, 1, '2024-01-02'),
(135, 16, 2, 8, '2024-02-18'),
(136, 2, 1, 4, '2024-03-02'),
(137, 3, 4, 7, '2024-01-31'),
(138, 16, 3, 6, '2024-02-20'),
(139, 2, 2, 3, '2024-03-03'),
(140, 3, 1, 5, '2024-01-12'),
(141, 16, 4, 2, '2024-02-22'),
(142, 2, 3, 4, '2024-03-05'),
(143, 3, 2, 6, '2024-01-10'),
(144, 16, 1, 7, '2024-02-26'),
(145, 2, 4, 1, '2024-03-28'),
(146, 3, 3, 8, '2024-01-14'),
(147, 16, 2, 5, '2024-02-24'),
(148, 2, 1, 2, '2024-03-04'),
(149, 3, 4, 6, '2024-01-17'),
(150, 16, 3, 3, '2024-02-28'),
(151, 2, 2, 1, '2024-03-10'),
(152, 3, 1, 4, '2024-01-19'),
(153, 16, 4, 5, '2024-02-25'),
(154, 2, 3, 7, '2024-03-12'),
(155, 3, 2, 8, '2024-01-20'),
(156, 16, 1, 6, '2024-02-23'),
(157, 2, 4, 3, '2024-03-18'),
(158, 3, 3, 2, '2024-01-29'),
(159, 16, 2, 4, '2024-02-27'),
(160, 2, 1, 8, '2024-03-20'),
(161, 3, 4, 5, '2024-01-07'),
(162, 16, 3, 1, '2024-02-11'),
(163, 2, 2, 6, '2024-03-19'),
(164, 3, 1, 7, '2024-01-30'),
(165, 16, 4, 2, '2024-02-14'),
(166, 2, 3, 4, '2024-03-22'),
(167, 3, 2, 5, '2024-01-11'),
(168, 16, 1, 3, '2024-02-16'),
(169, 2, 4, 1, '2024-03-25'),
(170, 3, 3, 8, '2024-01-13'),
(171, 16, 2, 7, '2024-02-10'),
(172, 2, 1, 2, '2024-03-24'),
(173, 3, 4, 4, '2024-01-21'),
(174, 16, 3, 6, '2024-02-12'),
(175, 2, 2, 5, '2024-03-26'),
(176, 3, 1, 1, '2024-01-08'),
(177, 16, 4, 3, '2024-02-08'),
(194, 2, 2, 2, '2024-05-26'),
(195, 2, 2, 2, '2023-05-15'),
(196, 3, 1, 4, '2023-06-12'),
(197, 16, 4, 7, '2023-07-25'),
(198, 2, 3, 1, '2023-08-08'),
(199, 3, 2, 5, '2023-09-10'),
(200, 16, 1, 3, '2023-10-02'),
(201, 2, 4, 6, '2023-11-05'),
(202, 3, 3, 8, '2023-05-15'),
(203, 16, 2, 2, '2023-06-27'),
(204, 2, 1, 7, '2023-07-29'),
(205, 3, 4, 1, '2023-08-13'),
(206, 16, 3, 5, '2023-09-20'),
(207, 2, 2, 4, '2023-10-05'),
(208, 3, 1, 6, '2023-11-21'),
(209, 16, 4, 3, '2023-05-15'),
(210, 2, 3, 2, '2023-06-30'),
(211, 3, 2, 8, '2023-07-25'),
(212, 16, 1, 5, '2023-08-11'),
(213, 2, 4, 7, '2023-09-05'),
(214, 3, 3, 6, '2023-10-19'),
(215, 16, 2, 4, '2023-11-14'),
(216, 2, 1, 3, '2023-05-10'),
(217, 3, 4, 8, '2023-06-27'),
(218, 16, 3, 7, '2023-07-03'),
(219, 2, 2, 5, '2023-08-22'),
(220, 3, 1, 2, '2023-09-18'),
(221, 16, 4, 6, '2023-10-25'),
(222, 2, 3, 4, '2023-11-11'),
(223, 3, 2, 7, '2023-05-17'),
(224, 16, 1, 1, '2023-06-22'),
(225, 2, 4, 8, '2023-07-06'),
(226, 3, 3, 5, '2023-08-14'),
(227, 16, 2, 3, '2023-09-28'),
(228, 2, 1, 6, '2023-10-15'),
(229, 3, 4, 2, '2023-11-06'),
(230, 16, 3, 8, '2023-05-24'),
(231, 2, 2, 7, '2023-06-10'),
(232, 3, 1, 5, '2023-07-13'),
(233, 16, 4, 4, '2023-08-08'),
(234, 2, 3, 2, '2023-09-13'),
(235, 3, 2, 6, '2023-10-14'),
(236, 16, 1, 8, '2023-11-04'),
(237, 2, 4, 1, '2023-05-01'),
(238, 3, 3, 7, '2023-06-14'),
(239, 16, 2, 5, '2023-07-12'),
(240, 2, 1, 4, '2023-08-19'),
(241, 3, 4, 3, '2023-09-16'),
(242, 16, 3, 6, '2023-10-20'),
(243, 2, 2, 8, '2023-11-14'),
(244, 3, 1, 7, '2023-05-22'),
(245, 16, 4, 2, '2023-06-26'),
(246, 2, 3, 5, '2023-07-07'),
(247, 3, 2, 4, '2023-08-15'),
(248, 16, 1, 6, '2023-09-11'),
(249, 2, 4, 7, '2023-10-11'),
(250, 3, 3, 2, '2023-11-29'),
(251, 16, 2, 1, '2023-05-09'),
(252, 2, 1, 3, '2023-06-15'),
(253, 3, 4, 8, '2023-07-17'),
(254, 16, 3, 7, '2023-08-03'),
(255, 2, 2, 6, '2023-09-09'),
(256, 3, 1, 5, '2023-10-10'),
(257, 16, 4, 4, '2023-11-08'),
(258, 2, 3, 2, '2023-05-13'),
(259, 3, 2, 8, '2023-06-18'),
(260, 16, 1, 5, '2023-07-22'),
(261, 2, 4, 1, '2023-08-26'),
(262, 3, 3, 7, '2023-09-12'),
(263, 16, 2, 6, '2023-10-23'),
(264, 2, 1, 4, '2023-11-03'),
(265, 3, 4, 5, '2023-05-15'),
(266, 16, 3, 8, '2023-06-20'),
(267, 2, 2, 7, '2023-07-04'),
(268, 3, 1, 6, '2023-08-24'),
(269, 16, 4, 3, '2023-09-30'),
(270, 2, 3, 5, '2023-10-13'),
(271, 3, 2, 2, '2023-11-17'),
(272, 16, 1, 4, '2023-05-02'),
(273, 2, 4, 8, '2023-06-17'),
(274, 3, 3, 6, '2023-07-19'),
(275, 16, 2, 1, '2023-08-16'),
(276, 2, 1, 7, '2023-09-22'),
(277, 3, 4, 3, '2023-10-07'),
(278, 16, 3, 5, '2023-11-10'),
(279, 2, 2, 6, '2023-05-27'),
(280, 3, 1, 8, '2023-06-16'),
(281, 16, 4, 4, '2023-07-21'),
(282, 2, 3, 2, '2023-08-10'),
(283, 3, 2, 7, '2023-09-15'),
(284, 16, 1, 3, '2023-10-12'),
(285, 2, 4, 5, '2023-11-16'),
(286, 3, 3, 1, '2023-05-25'),
(287, 16, 2, 8, '2023-06-24'),
(288, 2, 1, 4, '2023-07-05'),
(289, 3, 4, 7, '2023-08-20'),
(290, 16, 3, 6, '2023-09-08'),
(291, 2, 2, 3, '2023-10-01'),
(292, 3, 1, 5, '2023-11-09'),
(293, 16, 4, 2, '2023-05-23'),
(294, 2, 3, 4, '2023-06-19'),
(295, 3, 2, 6, '2023-07-15'),
(296, 16, 1, 7, '2023-08-09'),
(297, 2, 4, 1, '2023-09-04'),
(298, 3, 3, 8, '2023-10-08'),
(299, 16, 2, 5, '2023-11-04'),
(300, 2, 1, 2, '2023-05-12'),
(301, 3, 4, 6, '2023-06-15'),
(302, 16, 3, 3, '2023-07-11'),
(303, 2, 2, 1, '2023-08-04'),
(304, 3, 1, 4, '2023-09-05'),
(305, 16, 4, 5, '2023-10-15'),
(306, 2, 3, 7, '2023-11-03'),
(307, 3, 2, 8, '2023-05-14'),
(308, 16, 1, 6, '2023-06-29'),
(309, 2, 4, 3, '2023-07-10'),
(310, 3, 3, 2, '2023-08-11'),
(311, 16, 2, 4, '2023-09-13'),
(312, 2, 1, 8, '2023-10-26'),
(313, 3, 4, 5, '2023-11-02'),
(314, 16, 3, 1, '2023-05-19'),
(315, 2, 2, 6, '2023-06-23'),
(316, 3, 1, 7, '2023-07-18'),
(317, 16, 4, 2, '2023-08-27'),
(318, 2, 3, 4, '2023-09-01'),
(319, 3, 2, 5, '2023-10-19'),
(320, 16, 1, 3, '2023-11-01'),
(321, 2, 4, 1, '2023-05-18'),
(322, 3, 3, 8, '2023-06-28'),
(323, 16, 2, 7, '2023-07-09'),
(324, 2, 1, 2, '2023-08-12'),
(325, 3, 4, 6, '2023-09-27'),
(326, 16, 3, 5, '2023-10-09'),
(327, 2, 2, 1, '2023-11-05'),
(328, 3, 1, 4, '2023-05-16'),
(329, 16, 4, 7, '2023-06-22'),
(330, 2, 3, 3, '2023-07-11'),
(331, 3, 2, 8, '2023-08-05'),
(332, 16, 1, 6, '2023-09-03'),
(333, 2, 4, 5, '2023-10-24'),
(334, 3, 3, 2, '2023-11-02'),
(335, 16, 2, 4, '2023-05-21'),
(336, 2, 1, 7, '2023-06-13'),
(337, 3, 4, 1, '2023-07-20'),
(338, 16, 3, 8, '2023-08-17'),
(339, 2, 2, 3, '2023-09-10'),
(340, 3, 1, 6, '2023-10-03'),
(341, 16, 4, 5, '2023-11-15'),
(342, 2, 3, 2, '2023-05-11'),
(343, 3, 2, 7, '2023-06-21'),
(344, 16, 1, 4, '2023-07-02'),
(345, 2, 4, 1, '2023-08-18'),
(346, 3, 3, 8, '2023-09-29'),
(347, 16, 2, 5, '2023-10-02'),
(348, 2, 1, 6, '2023-11-11'),
(349, 3, 4, 7, '2023-05-29'),
(350, 16, 3, 3, '2023-06-20'),
(351, 2, 2, 8, '2023-07-24'),
(352, 3, 1, 4, '2023-08-02'),
(353, 16, 4, 5, '2023-09-19'),
(354, 2, 3, 6, '2023-10-21'),
(355, 3, 2, 1, '2023-11-09'),
(356, 16, 1, 2, '2023-05-03'),
(357, 2, 4, 7, '2023-06-30'),
(358, 3, 3, 5, '2023-07-30'),
(359, 16, 2, 6, '2023-08-21'),
(360, 2, 1, 4, '2023-09-14'),
(361, 3, 4, 3, '2023-10-18'),
(362, 16, 3, 8, '2023-11-12'),
(363, 2, 2, 5, '2023-05-31'),
(364, 3, 1, 7, '2023-06-01'),
(365, 16, 4, 2, '2023-07-14'),
(366, 2, 3, 6, '2023-08-22'),
(367, 3, 2, 4, '2023-09-20'),
(368, 16, 1, 8, '2023-10-04');

--
-- Disparadores `registro`
--
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
  `TorreCarga` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salidas`
--

INSERT INTO `salidas` (`Id`, `Numero`, `Estado`, `TorreCarga`) VALUES
(1, 1, 'D', 22),
(2, 2, 'D', 22),
(3, 3, 'D', 22),
(4, 4, 'D', 22),
(5, 1, 'D', 24),
(6, 2, 'D', 24),
(7, 3, 'D', 24),
(8, 4, 'D', 24),
(9, 1, 'D', 25),
(10, 2, 'D', 25),
(11, 3, 'D', 25),
(12, 4, 'D', 25);

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
(25, 'Torre Andares', 0x000000000101000000e6459af4edb53440838324b65cda59c0, 1);

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
(5, 'Diego', 'Romero', 'Corvera', '3312345678', 'diegobros2105@gmail.com', NULL, 6);

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
(2, 'Rodrigo', 'Romero', 'Romero', '3312345678', 'rocobros21@gmail.com', '2024-03-15', 62880, 'A', 'D', 2, 1),
(3, 'Diego', 'Romero', 'Corvera', '3338465252', 'diego2105@gmail.com', '2024-03-15', 68180, 'A', 'D', 2, 2),
(16, 'Monica', 'Corvera', 'Romo', '3318107819', 'monicorverar@gmail.com', '2024-04-17', 67700, 'D', 'D', 2, 29),
(37, 'Susana', 'Ferrer', 'Hernandez', '1234567890', 'a20300699@ceti.mx', '2024-05-17', 300, 'A', 'D', 2, 65);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `credenciales`
--
ALTER TABLE `credenciales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `nivelusuario`
--
ALTER TABLE `nivelusuario`
  MODIFY `Id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=369;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `torrecarga`
--
ALTER TABLE `torrecarga`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuariosadministradores`
--
ALTER TABLE `usuariosadministradores`
  MODIFY `Registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuariosmoderadores`
--
ALTER TABLE `usuariosmoderadores`
  MODIFY `Registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
