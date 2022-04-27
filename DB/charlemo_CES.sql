-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2022 at 07:28 PM
-- Server version: 5.6.41-84.1
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `charlemo_CES`
--

-- --------------------------------------------------------

--
-- Table structure for table `assembly_interaction`
--

CREATE TABLE `assembly_interaction` (
  `interaction_id` int(11) NOT NULL,
  `part_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `interaction_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assembly_interaction`
--

INSERT INTO `assembly_interaction` (`interaction_id`, `part_id`, `user_id`, `amount`, `interaction_datetime`) VALUES
(1, 2, 1, 50, '2022-02-21 16:26:16'),
(2, 4, 1, 5, '2022-02-21 16:26:24'),
(3, 7, 2, 20, '2022-02-21 16:26:34'),
(4, 17, 3, 2, '2022-01-28 15:53:28'),
(5, 20, 3, 800, '2022-01-21 14:55:12'),
(6, 10, 3, 5, '2022-01-25 12:56:41'),
(7, 20, 8, 200, '2022-01-10 12:14:56'),
(8, 21, 8, 13, '2022-01-09 15:15:23'),
(9, 8, 7, 1000, '2022-02-15 09:42:23'),
(10, 12, 4, 9500, '2022-02-20 15:23:18'),
(29, 33, 1, 10, '2022-04-15 14:24:20'),
(30, 33, 1, -10, '2022-04-15 14:24:24'),
(62, 16, 1, 5, '2022-04-20 16:41:39'),
(63, 16, 1, 20, '2022-04-20 16:43:27'),
(64, 16, 1, 20, '2022-04-20 16:43:38'),
(65, 16, 1, -20, '2022-04-20 16:45:59'),
(66, 16, 1, -20, '2022-04-20 16:46:13'),
(67, 16, 1, 10, '2022-04-20 16:54:47'),
(68, 16, 1, 10, '2022-04-20 17:17:12'),
(69, 16, 1, 10, '2022-04-20 17:17:18'),
(70, 16, 1, 30, '2022-04-21 00:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `assembly_part`
--

CREATE TABLE `assembly_part` (
  `part_id` int(11) NOT NULL,
  `serial_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `low_warning` int(11) NOT NULL,
  `order_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assembly_part`
--

INSERT INTO `assembly_part` (`part_id`, `serial_number`, `name`, `notes`, `quantity`, `low_warning`, `order_url`) VALUES
(1, 'XB4', 'Nuts', 'buy more at the end of the month', 200, 20, 'https://www.screwfix.com/p/easyfix-bright-zinc-plated-high-tensile-steel-hex-bolts-m16-x-60mm-25-pack/40132'),
(2, 'RG7', 'Bolts', NULL, 1000, 150, 'https://www.screwfix.com/p/friulsider-clr-stainless-steel-a4-stainless-steel-concrete-bolts-12mm-x-125mm-25-pack/557jy'),
(3, 'GZO9', 'GZO9 Washers', 'for walkers job', 50, 10, 'https://www.screwfix.com/p/easyfix-steel-large-flat-washers-m6-x-1-6mm-100-pack/413ft'),
(4, 'GZ08', 'GZ08 Washers', NULL, 10, 5, 'https://www.screwfix.com/p/easyfix-steel-square-washers-m12-x-4mm-50-pack/452ft'),
(5, 'ME-12-A4', 'ME-12-A4 Screws', 'order coming in next week', 0, 20, 'https://www.screwfix.com/p/ultra-screw-pz-double-countersunk-multipurpose-screws-5-x-50mm-200-pack/80243'),
(6, 'I5', 'Brackets', NULL, 10, 1, 'https://www.screwfix.com/p/sabrefix-heavy-duty-angle-brackets-galvanised-40-x-60mm-25-pack/71671'),
(7, 'P34', 'Screws', 'keep an eye on these', 600, 100, 'https://www.screwfix.com/p/easydrive-electrical-screws-m3-5-x-50mm-50-pack/8036h'),
(8, 'PZDCS1000', 'TurboGold PZ Double-Countersunk Wood Screws 1000 Pieces', NULL, 6000, 5000, 'https://www.screwfix.com/p/turbogold-pz-double-countersunk-wood-screws-1000-pieces/554kr'),
(9, 'M16X60', 'Easyfix  Bright Zinc-Plated High Tensile Steel Hex Bolts', NULL, 1500, 2000, 'https://www.screwfix.com/p/easyfix-bright-zinc-plated-high-tensile-steel-hex-bolts-m16-x-60mm-25-pack/40132'),
(10, 'NNDC5', 'No Nonsense Decorators\' Caulk White 310ml', 'Needed for big contract do not let these run low', 27, 25, 'https://www.screwfix.com/p/no-nonsense-decorators-caulk-white-310ml/57568'),
(11, 'EFA2', 'Easyfix A2 Stainless Steel Nylon Lock Nuts M6 100 Pack', NULL, 900, 700, 'https://www.screwfix.com/p/easyfix-a2-stainless-steel-nylon-lock-nuts-m6-100-pack/6758t'),
(12, 'EFR45100', 'Easyfix Round Wire Bright Nails 4.5 x 100mm 1kg Pack', 'Do not order these for the nail guns as they do not fit', 35000, 25000, 'https://www.screwfix.com/p/easyfix-round-wire-bright-nails-4-5-x-100mm-1kg-pack/16534'),
(13, 'EFR56125', 'Easyfix Round Wire Bright Nails 5.6 x 125mm 1kg Pack', 'Do not order these for the nail guns as they do not fit', 40000, 25000, 'https://www.screwfix.com/p/easyfix-round-wire-bright-nails-5-6-x-125mm-1kg-pack/11036'),
(14, 'EFR6150', 'Easyfix Round Wire Bright Nails 6 x 150mm 1kg Pack', 'Check price when ordering', 13000, 25000, 'https://www.screwfix.com/p/easyfix-round-wire-bright-nails-6-x-150mm-1kg-pack/13869'),
(15, 'EDSD5575', 'Easydrive Carbon Steel Self-Drilling Screws 5.5 x 75mm 100 Pack', NULL, 97, 25000, 'https://www.screwfix.com/p/easydrive-carbon-steel-self-drilling-screws-5-5-x-75mm-100-pack/44476'),
(16, 'EDSD4822', 'Easydrive Self-Drilling Low Profile Wafer Screws 4.8 x 22 x 200 Pack', 'Let these run down as better ones available', 100, 900, 'https://www.screwfix.com/p/easydrive-self-drilling-low-profile-wafer-screws-4-8-x-22-x-200-pack/7483h?_requestid=434522'),
(17, 'SABH9063', 'Sabrefix Heavy Duty Angle Brackets Galvanised 90 x 63mm 25 Pack', 'Check with Manager before ordering any more', 12, 5, 'https://www.screwfix.com/p/sabrefix-heavy-duty-angle-brackets-galvanised-90-x-63mm-25-pack/69361'),
(18, 'EHWAM552', 'Easyfix Hollow Wall Anchors M5 x 52mm 100 Pack', NULL, 1217, 300, 'https://www.screwfix.com/p/easyfix-hollow-wall-anchors-m5-x-52mm-100-pack/5643p'),
(19, 'EFSE12G55', 'Easyfix Zinc-Plated Screw Eyes 12ga x 55mm 10 Pack', NULL, 197, 100, 'https://www.screwfix.com/p/easyfix-zinc-plated-screw-eyes-12ga-x-55mm-10-pack/17867'),
(20, 'ZP21910', 'Zinc-Plated Hooks 2mm x 19mm 10 Pack', 'Check for trade discount when ordering these', 1800, 1000, 'https://www.screwfix.com/p/zinc-plated-hooks-2mm-x-19mm-10-pack/65216'),
(21, 'EFEB1059', 'Easyfix Electro Brass Cup Hooks  x  10 Pack', NULL, -1, 50, 'https://www.screwfix.com/p/easyfix-electro-brass-cup-hooks-x-10-pack/17104');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`) VALUES
(1, 'Parker'),
(2, 'Walker');

-- --------------------------------------------------------

--
-- Table structure for table `qr_code`
--

CREATE TABLE `qr_code` (
  `qr_id` int(11) NOT NULL,
  `qr_code_string` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `qr_code`
--

INSERT INTO `qr_code` (`qr_id`, `qr_code_string`) VALUES
(1, 'location=1'),
(2, 'location=2'),
(3, 'location=3'),
(4, 'location=4'),
(5, 'location=5'),
(6, 'location=6'),
(7, 'location=7'),
(8, 'location=8'),
(9, 'location=9'),
(10, 'location=10'),
(11, 'serial_number=1'),
(12, 'serial_number=2'),
(13, 'serial_number=3'),
(14, 'serial_number=4'),
(15, 'serial_number=5'),
(16, 'serial_number=6'),
(17, 'serial_number=7'),
(18, 'serial_number=8'),
(19, 'serial_number=9'),
(20, 'serial_number=10'),
(21, 'serial_number=11'),
(22, 'location=14'),
(23, 'location=15');

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `storage_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `part_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`storage_id`, `quantity`, `client_id`, `location_id`, `part_id`) VALUES
(1, 10000, 1, 3, 6),
(2, 69, 1, 2, 2),
(3, 95, 1, 1, 3),
(4, 12, 1, 6, 7),
(5, 5, 2, 4, 8),
(6, 50, 1, 7, 2),
(7, 75, 2, 8, 1),
(8, 24, 2, 5, 2),
(9, 15, 2, 9, 3),
(10, 82, 1, 10, 5),
(11, 5, 1, 12, 4),
(12, 0, 2, 13, 4),
(13, 25, 2, 11, 9);

-- --------------------------------------------------------

--
-- Table structure for table `storage_interaction`
--

CREATE TABLE `storage_interaction` (
  `interaction_id` int(11) NOT NULL,
  `storage_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `interaction_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `storage_interaction`
--

INSERT INTO `storage_interaction` (`interaction_id`, `storage_id`, `user_id`, `amount`, `interaction_datetime`) VALUES
(1, 1, 1, 50, '2022-02-21 16:26:16'),
(2, 2, 1, 5, '2022-02-21 16:26:24'),
(3, 3, 2, 20, '2022-02-21 16:26:34'),
(4, 4, 2, 32, '2022-02-21 16:26:34'),
(5, 5, 2, 34, '2022-02-21 16:26:34'),
(6, 6, 1, 60, '2022-02-21 16:26:34'),
(7, 7, 1, 18, '2022-02-21 16:26:34'),
(8, 8, 2, 50, '2022-02-21 16:26:34'),
(11, 3, 1, 25, '2022-04-20 11:16:41'),
(12, 3, 1, 20, '2022-04-20 11:17:12'),
(13, 3, 1, 10, '2022-04-20 11:20:25'),
(14, 3, 1, -5, '2022-04-20 11:21:07'),
(15, 8, 1, 12, '2022-04-20 11:22:25'),
(16, 3, 1, 5, '2022-04-20 11:24:01'),
(17, 3, 1, 5, '2022-04-20 11:24:09'),
(18, 3, 1, 5, '2022-04-20 11:24:13'),
(19, 2, 1, 10, '2022-04-20 11:25:19'),
(20, 2, 1, 10, '2022-04-20 11:25:23'),
(21, 2, 1, 20, '2022-04-20 11:25:26'),
(22, 2, 1, -40, '2022-04-20 11:25:59'),
(23, 3, 1, 5, '2022-04-20 11:26:32'),
(24, 3, 1, 5, '2022-04-20 17:45:50'),
(25, 2, 1, 69, '2022-04-20 17:49:14'),
(26, 3, 1, 10, '2022-04-20 17:53:55'),
(27, 3, 1, -10, '2022-04-20 17:53:59'),
(28, 3, 1, 20, '2022-04-21 00:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `storage_location`
--

CREATE TABLE `storage_location` (
  `storage_location_id` int(11) NOT NULL,
  `qr_id` int(11) NOT NULL,
  `warehouse_number` int(11) NOT NULL,
  `location_string` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `storage_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `storage_location`
--

INSERT INTO `storage_location` (`storage_location_id`, `qr_id`, `warehouse_number`, `location_string`, `storage_type`) VALUES
(1, 1, 1, 'A01', 'shelf'),
(2, 2, 1, 'A02', 'shelf'),
(3, 3, 2, 'A01', 'pallet'),
(4, 4, 1, 'A03', 'shelf'),
(5, 5, 3, 'A01', 'pallet'),
(6, 6, 5, 'S01', 'shelf'),
(7, 7, 4, 'S01', 'bin'),
(8, 8, 1, 'A04', 'bin'),
(9, 9, 2, 'S01', 'shelf'),
(10, 10, 3, 'A02', 'pallet'),
(11, 11, 1, 'A14', 'pallet'),
(12, 12, 2, 'A12', 'pallet'),
(13, 13, 3, 'A06', 'pallet');

-- --------------------------------------------------------

--
-- Table structure for table `storage_part`
--

CREATE TABLE `storage_part` (
  `part_id` int(11) NOT NULL,
  `serial_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `qr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `storage_part`
--

INSERT INTO `storage_part` (`part_id`, `serial_number`, `name`, `description`, `qr_id`) VALUES
(1, 'AM-R1', 'filter nozzle', 'A nozzle for an AM filter system', 11),
(2, 'AM-R2', 'filter screw cap', 'A screw cap for an AM filter system', 12),
(3, 'AM-R3', 'filter vent', 'A vent for an AM filter system', 13),
(4, 'LX-5', 'filter nozzle', 'A nozzle for an LX filter system', 14),
(5, 'LX-6', 'L-pipe', 'L-pipe for an LX filter system', 15),
(6, 'LX-7', 'bearings', '5mm ball baearings for an LX filter system', 16),
(7, 'RS-12', 'radiator', 'Radiator for RS bucket', 17),
(8, 'RS-13', 'colling shaft', 'Cooling shaft for RS bucket', 18),
(9, '22-DFR', 'M10 screws', 'M10 machine screws', 19),
(10, 'H275K', 'Hooks 97mm', 'Medium Hooks', 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email_address`, `password`, `firstname`, `lastname`, `phone_number`, `role_id`) VALUES
(1, 'michael.scott@charltoneng.co.uk', 'Manager1', 'Michael', 'Scott', '72345678922', 102),
(2, 'dwight.schrute@charltoneng.co.uk', 'Worker1', 'Dwight', 'Schrute', '19823748495', 101),
(3, 'james.halpert@charltoneng.co.uk', 'User1', 'James', 'Halpert', '23456789421', 101),
(4, 'andrew.bernard@charltoneng.co.uk', 'narddog1', 'Andrew', 'Bernard', '01912254554', 101),
(5, 'janice.levinson@charltoneng.co.uk', 'janlev1', 'Janice', 'Levinson', '07707665998', 102),
(6, 'stanley.hudson@charltoneng.co.uk', 'stanhud1', 'Stanley', 'Hudson', '01916559874', 101),
(7, 'david.wallace@charltoneng.co.uk', 'david1', 'David', 'Wallace', '019755878', 103),
(8, 'roy.anderson@charltoneng.co.uk', 'roy1', 'Roy', 'Anderson', '0774745567', 104),
(9, 'katy.adams@charltoneng.co.uk', 'katy1', 'Katy', 'Adams', '07707568654', 104);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role_desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`role_id`, `role_name`, `role_desc`) VALUES
(101, 'Worker', 'The worker has acccess to the QR system and is authorised to manage stock'),
(102, 'Manager', 'The Manager has access to the user account management system and stock reporting system'),
(103, 'Admin', NULL),
(104, 'Inactive', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assembly_interaction`
--
ALTER TABLE `assembly_interaction`
  ADD PRIMARY KEY (`interaction_id`),
  ADD UNIQUE KEY `interaction_id` (`interaction_id`);

--
-- Indexes for table `assembly_part`
--
ALTER TABLE `assembly_part`
  ADD PRIMARY KEY (`part_id`),
  ADD UNIQUE KEY `part_id` (`part_id`),
  ADD UNIQUE KEY `serial_number` (`serial_number`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_id` (`client_id`);

--
-- Indexes for table `qr_code`
--
ALTER TABLE `qr_code`
  ADD PRIMARY KEY (`qr_id`),
  ADD UNIQUE KEY `qr_id` (`qr_id`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`storage_id`),
  ADD UNIQUE KEY `storage_id` (`storage_id`);

--
-- Indexes for table `storage_interaction`
--
ALTER TABLE `storage_interaction`
  ADD PRIMARY KEY (`interaction_id`),
  ADD UNIQUE KEY `interaction_id` (`interaction_id`);

--
-- Indexes for table `storage_location`
--
ALTER TABLE `storage_location`
  ADD PRIMARY KEY (`storage_location_id`),
  ADD UNIQUE KEY `storage_location_id` (`storage_location_id`);

--
-- Indexes for table `storage_part`
--
ALTER TABLE `storage_part`
  ADD PRIMARY KEY (`part_id`),
  ADD UNIQUE KEY `part_id` (`part_id`),
  ADD UNIQUE KEY `serial_number` (`serial_number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_id` (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assembly_interaction`
--
ALTER TABLE `assembly_interaction`
  MODIFY `interaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `assembly_part`
--
ALTER TABLE `assembly_part`
  MODIFY `part_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qr_code`
--
ALTER TABLE `qr_code`
  MODIFY `qr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `storage`
--
ALTER TABLE `storage`
  MODIFY `storage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `storage_interaction`
--
ALTER TABLE `storage_interaction`
  MODIFY `interaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `storage_location`
--
ALTER TABLE `storage_location`
  MODIFY `storage_location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `storage_part`
--
ALTER TABLE `storage_part`
  MODIFY `part_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
