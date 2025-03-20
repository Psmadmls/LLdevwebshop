-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 08:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minecraft`
--

-- --------------------------------------------------------

--
-- Table structure for table `authme`
--

CREATE TABLE `authme` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `totp` varchar(32) DEFAULT NULL,
  `ip` varchar(40) DEFAULT NULL,
  `lastlogin` bigint(20) DEFAULT NULL,
  `regdate` bigint(20) NOT NULL,
  `regip` varchar(40) DEFAULT NULL,
  `x` double NOT NULL DEFAULT 0,
  `y` double NOT NULL DEFAULT 0,
  `z` double NOT NULL DEFAULT 0,
  `world` varchar(255) NOT NULL DEFAULT 'world',
  `yaw` float DEFAULT NULL,
  `pitch` float DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isLogged` int(11) DEFAULT 0,
  `realname` varchar(255) NOT NULL DEFAULT 'Player',
  `salt` varchar(255) DEFAULT NULL,
  `hasSession` int(11) NOT NULL DEFAULT 0,
  `rank` double NOT NULL,
  `point` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authme`
--

INSERT INTO `authme` (`id`, `username`, `password`, `totp`, `ip`, `lastlogin`, `regdate`, `regip`, `x`, `y`, `z`, `world`, `yaw`, `pitch`, `email`, `isLogged`, `realname`, `salt`, `hasSession`, `rank`, `point`) VALUES
(6, 'pech1432j', '$2a$12$hIDSnNqni5WBXwvVxnkW0OKBdrAJzpKkWhNfNAhf4hDS0YAjBqMy6', NULL, '127.0.0.1', 1742454927314, 1742027004993, '127.0.0.1', 0, 0, 0, 'world', NULL, NULL, NULL, 0, 'pech1432j', NULL, 0, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `command` varchar(255) NOT NULL,
  `priceture` varchar(255) NOT NULL,
  `Optionsquantity` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `command`, `priceture`, `Optionsquantity`) VALUES
(1, 'stone', 10, 'give %player% stone %quantity%', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/d4/Stone.png/revision/latest?cb=20220112085705', 'false'),
(2, 'test', 20, 'test', 'https://m1r.ai/SPldb.svg', 'false'),
(12, 'Test Item', 100, 'give testitem', 'test.png', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `ranks`
--

CREATE TABLE `ranks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `command` varchar(255) NOT NULL,
  `priceture` varchar(255) NOT NULL,
  `Optionsquantity` varchar(255) NOT NULL,
  `rank_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `name`, `price`, `command`, `priceture`, `Optionsquantity`, `rank_id`) VALUES
(1, 'test', 0, '', './next.svg', 'test', 0),
(2, 'test', 0, '', './next.svg', 'test', 0),
(3, 'test', 10, 'say hi', './next.svg', 'true', 2),
(20, 'test', 200, 'say hi', './next.svg', 'true', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authme`
--
ALTER TABLE `authme`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authme`
--
ALTER TABLE `authme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
