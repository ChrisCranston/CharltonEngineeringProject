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
-- Database: `charlemo_CESCUST`
--

-- --------------------------------------------------------

--
-- Table structure for table `prospective_client_query`
--

CREATE TABLE `prospective_client_query` (
  `query_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prospective_client_type_id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_query` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `query_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prospective_client_query`
--

INSERT INTO `prospective_client_query` (`query_id`, `date_time`, `_name`, `prospective_client_type_id`, `email`, `phone_number`, `_query`, `query_type_id`) VALUES
(1, '2022-02-12 16:00:00', 'Ron Stampler ltd.', 1, 'r.s@gmail.com', '0748 52747582', 'As a business man myself, I am looking for a new oportunity', 1),
(2, '2022-02-10 13:45:00', 'Darrel Wilson', 2, 'D.wilson@gmail.com', '0722 2939399', 'Can you sell me tools?', 4),
(3, '2022-02-09 12:00:00', 'Henry Oak', 2, 'Hen@oak.com', NULL, 'I am not happy with the service, ya\'ll lost my stuff.', 3),
(4, '2202-02-05 15:08:00', 'Susan\'s mechanics', 1, 's.mechs@gmail.com', '0191 958593', 'Requesting a call to enquire about the services', 2),
(5, '2022-02-01 10:12:00', 'Glen Close', 1, 'glen.close@hotmail.co.uk', '01250 284953', 'What are the bending services?', 1),
(6, '2022-01-30 09:10:00', 'Jenny darling', 1, 'jenny@coolbusiness.com', '020335 288583', 'Enquiring about using the services, would like to chat with LEe', 2),
(7, '2022-02-27 13:15:00', 'Bobby Tall', 1, 'Boby.Tall@hotmail.co.uk', NULL, 'Hi, I spoke to oone of your guys last weekabout getting hold of some M10 bolts you might have spare, ;email me back please', 1),
(8, '2022-03-01 15:42:00', 'Carl Kludge', 1, 'CalryTheMan@yahoo.co.uk', '077071236559', 'I need 40 sperleges buila for next month. You buildt them for me a year ago and said you would do a good deal if i needed more. ring me back please', 2),
(9, '2202-03-03 15:17:00', 'Christopher Collins', 1, 'Chirs.C@Gmail.com', '077074556987', 'Hey, I build website. I wanted to know if you needed your site updating, I also build stock managnent systems, let me know if you need my services', 2),
(10, '2022-03-04 17:50:00', 'Karen Pain', 2, 'Karen.Pain@aol.com', '0798789654', 'I AM SICK of the noise coming frm your factory. Please stop the noise it is anoying me AND my dog', 3),
(11, '2022-03-02 17:52:00', 'Jake Ashley', 2, 'jakyboy1985@yahoo.co.uk', '0131548774', 'I am in urgent need of some storage solution, plase let me know if you can accomadte, thanks', 4),
(12, '2202-02-27 15:17:00', 'Marge Smith', 1, 'MArgy.Smith@hotmail.co.uk', '01914547885', 'You took 1058 screws form us instread of 1057 please return the surpluss that you DID NOT PAY FOR or we will invoce you please respond ASAP', 3),
(52, '2022-04-20 14:53:00', 'Jane Doe', 1, 'Jane.doe@engltd.com', 'n/a', 'Hiya, &#13;&#10;Could you send me an email back, we are looking for a new company to host our boat parts.&#13;&#10;&#13;&#10;Thank you&#13;&#10;Jane', 1),
(53, '2022-04-20 14:54:00', 'Oliver Ty', 2, 'OllieTy@gmail.com', '+447893111823', 'Hey guys,&#13;&#10;I have just had a shipment of 500 units and need somewhere to move them asap. Please get in touch, thanks', 4),
(54, '2022-04-20 14:56:00', 'Tyson Green', 1, 'Ty.green@me.com', '+01202405822', 'Hello,&#13;&#10;I am from Engineering UK and we are looking for companies to be part of our new outreach program. Please give me a message if you are interested.&#13;&#10;&#13;&#10;Tyson', 2),
(55, '2022-04-20 22:47:00', 'James mason', 1, 'james@itsthemason.com', 'n/a', 'Please can someone get in touch with me, i need some pipe bending price quotations', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prospective_client_type`
--

CREATE TABLE `prospective_client_type` (
  `prospective_client_type_id` int(11) NOT NULL,
  `prospective_client_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prospective_client_type`
--

INSERT INTO `prospective_client_type` (`prospective_client_type_id`, `prospective_client_type`) VALUES
(1, 'business'),
(2, 'individual');

-- --------------------------------------------------------

--
-- Table structure for table `query_type`
--

CREATE TABLE `query_type` (
  `query_type_id` int(11) NOT NULL,
  `query_type_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `query_type`
--

INSERT INTO `query_type` (`query_type_id`, `query_type_name`) VALUES
(1, 'enquiry - requesting email response'),
(2, 'enquiry - requesting phone call response'),
(3, 'review'),
(4, 'urgent request');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prospective_client_query`
--
ALTER TABLE `prospective_client_query`
  ADD PRIMARY KEY (`query_id`);

--
-- Indexes for table `prospective_client_type`
--
ALTER TABLE `prospective_client_type`
  ADD PRIMARY KEY (`prospective_client_type_id`),
  ADD UNIQUE KEY `prospective_client_type_id` (`prospective_client_type_id`);

--
-- Indexes for table `query_type`
--
ALTER TABLE `query_type`
  ADD PRIMARY KEY (`query_type_id`),
  ADD UNIQUE KEY `query_type_id` (`query_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prospective_client_query`
--
ALTER TABLE `prospective_client_query`
  MODIFY `query_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `prospective_client_type`
--
ALTER TABLE `prospective_client_type`
  MODIFY `prospective_client_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `query_type`
--
ALTER TABLE `query_type`
  MODIFY `query_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
