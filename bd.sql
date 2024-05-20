-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2024 a las 03:25:05
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
  `Titulo` varchar(255) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `UsuarioModerador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`Id`, `Titulo`, `Descripcion`, `Imagen`, `UsuarioModerador`) VALUES
(3, 'Novedad Uno', 'Descripcion', 'URL', 2);

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
(18, 2, 3, 8, '2024-05-16');

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
    FROM registro
    WHERE UsuarioNormal = NEW.UsuarioNormal;

    
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
(8, 4, 'D', 24);

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
(24, 'Torre Ceti Colomos', 0x00000000010100000086babb90c9b334405c8fb793dad859c0, 1);

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
  `Nivel` tinyint(4) NOT NULL DEFAULT 2,
  `Credencial` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosnormales`
--

INSERT INTO `usuariosnormales` (`Registro`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Celular`, `Correo`, `FechaCreacion`, `Tiempo`, `Estado`, `Nivel`, `Credencial`) VALUES
(2, 'Rodrigo', 'Romero', 'Corvera', '3316346586', 'rocobros21@gmail.com', '2024-03-15', 993, 'A', 2, 1),
(3, 'Diego', 'Romero', 'Corvera', '3338465252', 'diego2105@gmail.com', '2024-03-15', 6180, 'A', 2, 2),
(16, 'Monica', 'Corvera', 'Romo', '3318107819', 'monicorverar@gmail.com', '2024-04-17', 0, 'D', 2, 29),
(37, 'Susana', 'Ferrer', 'Hernandez', '1234567890', 'a20300699@ceti.mx', '2024-05-17', 0, 'A', 2, 65);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `torrecarga`
--
ALTER TABLE `torrecarga`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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

CREATE DEFINER=`root`@`localhost` EVENT `update_tiempo` ON SCHEDULE EVERY 1 MONTH STARTS '2024-05-19 19:03:30' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE usuariosnormales u
    JOIN nivelusuario n ON u.Nivel = n.Id
    SET u.Tiempo = u.Tiempo + n.SegundosAlMes;
END$$

CREATE DEFINER=`root`@`localhost` EVENT `reset_nivel` ON SCHEDULE EVERY 1 MONTH STARTS '2024-05-19 19:04:35' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE usuariosnormales
    SET Nivel = DEFAULT(Nivel);
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
