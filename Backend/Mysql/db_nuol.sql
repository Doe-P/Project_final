-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2021 at 03:42 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_nuol`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_activity`
--

CREATE TABLE `tb_activity` (
  `acti_id` varchar(30) NOT NULL,
  `acti_title` varchar(50) NOT NULL,
  `typeAct_id` varchar(30) NOT NULL,
  `place` varchar(50) NOT NULL,
  `amount_acti` int(10) NOT NULL,
  `date_acti` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_activity_detail`
--

CREATE TABLE `tb_activity_detail` (
  `act_NO` int(10) NOT NULL,
  `acti_id` varchar(30) NOT NULL,
  `member_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_certificate`
--

CREATE TABLE `tb_certificate` (
  `certific_id` varchar(30) NOT NULL,
  `typeCerti_id` varchar(30) NOT NULL,
  `certific_NO` varchar(30) NOT NULL,
  `title` varchar(60) NOT NULL,
  `amount_cert` int(10) NOT NULL,
  `locate` varchar(50) NOT NULL,
  `date_sign` date NOT NULL,
  `sign_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_certificate_detail`
--

CREATE TABLE `tb_certificate_detail` (
  `cert_NO` int(10) NOT NULL,
  `certific_id` varchar(30) NOT NULL,
  `member_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_educationlevel`
--

CREATE TABLE `tb_educationlevel` (
  `level_id` varchar(10) NOT NULL,
  `level_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_educationlevel`
--

INSERT INTO `tb_educationlevel` (`level_id`, `level_name`) VALUES
('lv001', 'ປະລິນຍາຕີ'),
('lv002', 'ປະລິນຍາໂທ'),
('lv003', 'ປະລິນຍາເອກ'),
('lv004', 'ອະນຸປະລິນຍາ'),
('lv005', 'ລໍຖ້າອະນຸມັດ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_foundation`
--

CREATE TABLE `tb_foundation` (
  `fund_id` varchar(30) NOT NULL,
  `fund_name` varchar(50) NOT NULL,
  `date_fund` date NOT NULL,
  `status_fund` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_foundation`
--

INSERT INTO `tb_foundation` (`fund_id`, `fund_name`, `date_fund`, `status_fund`) VALUES
('f001', 'ຄະນະທຳມະຊາດ', '2021-04-11', 'ບັນຈຸ'),
('f002', 'ຄະນະວິສະວະກຳສາດ', '2021-04-11', 'ບັນຈຸ'),
('f003', 'ຄະນະສຶກສາສາດ', '2021-04-11', 'ບັນຈຸ'),
('f004', 'ຄະນະສັງຄົມສາດ', '2021-04-11', 'ບັນຈຸ'),
('f005', 'ຄະນະອັກສອນສາດ', '2021-04-12', 'ບັນຈຸ'),
('f006', 'ຄະນະສັງຄົມສາດ', '0000-00-00', 'ບັນຈຸ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_member`
--

CREATE TABLE `tb_member` (
  `member_id` varchar(30) NOT NULL,
  `member_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthday` date NOT NULL,
  `bvillage` varchar(50) NOT NULL,
  `bdistrict` varchar(50) NOT NULL,
  `bprovince` varchar(50) NOT NULL,
  `nvillage` varchar(50) NOT NULL,
  `ndistrict` varchar(50) NOT NULL,
  `nprovince` varchar(50) NOT NULL,
  `nation` varchar(30) NOT NULL,
  `ethnic` varchar(30) NOT NULL,
  `religion` varchar(30) NOT NULL,
  `tell` int(15) NOT NULL,
  `date_Y` date DEFAULT NULL,
  `date_W` date DEFAULT NULL,
  `date_K` date DEFAULT NULL,
  `date_PS` date DEFAULT NULL,
  `date_P` date DEFAULT NULL,
  `sect_id` varchar(30) DEFAULT NULL,
  `typemember_id` varchar(20) DEFAULT NULL,
  `level_id` varchar(10) DEFAULT NULL,
  `responsible` varchar(50) DEFAULT NULL,
  `language` varchar(60) DEFAULT NULL,
  `blood` varchar(5) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_member`
--

INSERT INTO `tb_member` (`member_id`, `member_name`, `surname`, `gender`, `birthday`, `bvillage`, `bdistrict`, `bprovince`, `nvillage`, `ndistrict`, `nprovince`, `nation`, `ethnic`, `religion`, `tell`, `date_Y`, `date_W`, `date_K`, `date_PS`, `date_P`, `sect_id`, `typemember_id`, `level_id`, `responsible`, `language`, `blood`, `date_start`, `status`) VALUES
('fnns1111-17', 'ມະນີວັນ', 'ແກ້ວວົງສາ', 'ຍິງ', '1999-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'retired'),
('fnns1112-17', 'ຂຸນພົນ', 'ແກ້ວວົງສາ', 'ຊາຍ', '2000-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1113-17', 'ຍອດຊາຍ', 'ແກ້ວວົງສາ', 'ຊາຍ', '1998-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1114-17', 'ວັນໄຊ', 'ແກ້ວວົງສາ', 'ຊາຍ', '2000-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 2099999, '2014-11-11', '2015-11-11', '2016-11-11', '2018-11-11', '2019-11-11', 's001', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1115-17', 'ສົມຊາຍ', 'ແກ້ວວົງສາ', 'ຊາຍ', '1999-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1116-17', 'ບົວທອງ', 'ແກ້ວລາວົງ', 'ຊາຍ', '2021-06-19', 'ດົງໂດກ', 'ໄຊທານີ', 'ນະຄອນຫຼວງ', 'ດົງໂດກ', 'ໄຊທານີ', 'ນະຄອນຫຼວງ', 'ລາວ', 'ລຸ່ມ', 'ພຸດ', 2055558888, '2021-06-19', '2021-06-19', '2021-06-19', '2021-06-18', '2021-06-18', 's001', 'tmb003', 'lv005', 'admin', 'lao, english', 'A', '2021-06-19', 'retired'),
('fnns1117-17', 'ນໍ້າຫວານ', 'ແກ້ວວົງສາ', 'ຍິງ', '1983-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1118-17', 'ບຸນເກີດ', 'ແກ້ວວົງສາ', 'ຊາຍ', '1982-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1119-17', 'ສາຍໃຈ', 'ແກ້ວວົງສາ', 'ຊາຍ', '1984-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member'),
('fnns1120-17', 'ນໍ້າຝົນ', 'ແກ້ວວົງສາ', 'ຍິງ', '1981-11-01', 'napho', 'phonhong', 'vientiane', 'tanmixay', 'xaythany', 'vientiane capital', 'lao', 'laoloum', 'phoud', 20555555, '2014-04-07', '2019-11-11', '2020-11-11', '2018-11-11', '2019-11-11', 's002', 'tmb001', 'lv001', 'kk', 'lao', 'O', '2021-06-10', 'member');

-- --------------------------------------------------------

--
-- Table structure for table `tb_move`
--

CREATE TABLE `tb_move` (
  `move_id` varchar(30) NOT NULL,
  `move_NO` varchar(30) NOT NULL,
  `m_Year` varchar(30) NOT NULL,
  `reason` varchar(60) NOT NULL,
  `amount_move` int(30) NOT NULL,
  `locate` varchar(50) NOT NULL,
  `sign_by` varchar(50) NOT NULL,
  `date_move` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_move`
--

INSERT INTO `tb_move` (`move_id`, `move_NO`, `m_Year`, `reason`, `amount_move`, `locate`, `sign_by`, `date_move`) VALUES
('m001', 'm1112', '2022-2023', '', 10, 'ມຊ', 'Admin', '2021-06-15'),
('m002', 'm112', '2020-2021', 'ຍ້າຍວຽກ', 3, 'ມຊ  ', 'Boss', '2021-06-15'),
('m006', '44444', '2021', 'kkkk', 25, 'mz', 'Boss', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_move_detail`
--

CREATE TABLE `tb_move_detail` (
  `move_NO` int(255) NOT NULL,
  `move_id` varchar(30) NOT NULL,
  `member_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_move_detail`
--

INSERT INTO `tb_move_detail` (`move_NO`, `move_id`, `member_id`) VALUES
(7, 'm006', 'fnns1112-17'),
(8, 'm006', 'fnns1113-17'),
(9, 'm006', 'fnns1114-17');

-- --------------------------------------------------------

--
-- Table structure for table `tb_receive_detail`
--

CREATE TABLE `tb_receive_detail` (
  `receive_NO` int(10) NOT NULL,
  `receive_id` varchar(30) NOT NULL,
  `member_id` varchar(30) NOT NULL,
  `amount_month` int(10) NOT NULL,
  `money` int(20) NOT NULL,
  `total` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_receive_money`
--

CREATE TABLE `tb_receive_money` (
  `receive_id` varchar(30) NOT NULL,
  `quarterly` int(10) NOT NULL,
  `year` varchar(30) NOT NULL,
  `money_total` int(30) NOT NULL,
  `date` date NOT NULL,
  `fund_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_retirement`
--

CREATE TABLE `tb_retirement` (
  `id` int(255) NOT NULL,
  `member_id` varchar(30) NOT NULL,
  `retire_NO` varchar(30) NOT NULL,
  `No_Ask` varchar(30) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `date_Ask` date DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `date_retire` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_retirement`
--

INSERT INTO `tb_retirement` (`id`, `member_id`, `retire_NO`, `No_Ask`, `reason`, `date_Ask`, `age`, `date_retire`) VALUES
(5, 'fnns1111-17', 're002', '1112', 'ຄົບກະສຽນແລ້ວ', '2021-06-17', 40, '2021-06-17'),
(7, 'fnns1112-17', 're003', '1113', 'ຄົບກະສຽນແລ້ວ', '2021-06-17', 45, '2021-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `tb_section`
--

CREATE TABLE `tb_section` (
  `sect_id` varchar(30) NOT NULL,
  `sect_name` varchar(50) NOT NULL,
  `unit_id` varchar(30) NOT NULL,
  `date_sect` date NOT NULL,
  `status_sect` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_section`
--

INSERT INTO `tb_section` (`sect_id`, `sect_name`, `unit_id`, `date_sect`, `status_sect`) VALUES
('s001', 'CS 2016-2017', 'c001', '2021-04-18', 'ບັນຈຸ'),
('s002', 'CPR 2016-2017', 'c001', '2021-04-18', 'ບັນຈຸ'),
('s003', 'CW 2016-2017', 'c001', '2021-04-19', 'ບັນຈຸ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_typeactivity`
--

CREATE TABLE `tb_typeactivity` (
  `typeAct_id` varchar(30) NOT NULL,
  `typeAct_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_typecertificate`
--

CREATE TABLE `tb_typecertificate` (
  `typeCerti_id` varchar(30) NOT NULL,
  `typeCerti_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_typemember`
--

CREATE TABLE `tb_typemember` (
  `typemember_id` varchar(20) NOT NULL,
  `typemember_name` varchar(50) NOT NULL,
  `money` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_typemember`
--

INSERT INTO `tb_typemember` (`typemember_id`, `typemember_name`, `money`) VALUES
('tmb001', 'ອາຈານ', 30000),
('tmb002', 'ນັກສຶກສາ', 35000),
('tmb003', 'successfully', 40000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_unit`
--

CREATE TABLE `tb_unit` (
  `unit_id` varchar(30) NOT NULL,
  `unit_name` varchar(100) NOT NULL,
  `fund_id` varchar(30) NOT NULL,
  `date_unit` date NOT NULL,
  `status_unit` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_unit`
--

INSERT INTO `tb_unit` (`unit_id`, `unit_name`, `fund_id`, `date_unit`, `status_unit`) VALUES
('c001', 'ຄອມພິວເຕິ', 'f001', '2021-04-14', 'ບັນຈຸ'),
('m001', 'ຄະນິດສາດ', 'f001', '2021-04-14', 'ບັນຈຸ'),
('p001', 'ໄຟຟ້ານິວເຄຍ', 'f002', '2021-06-08', 'ບັນຈຸ'),
('p002', 'ໄຟຟ້າອຸດສາຫະກຳ', 'f002', '2021-06-09', 'ລໍຖ້າ'),
('u001', 'ຟີຊິກສາດ', 'f001', '2021-04-14', 'ບັນຈຸ'),
('u002', 'ເຄມີສາດ', 'f001', '2021-04-14', 'ລໍຖ້າ'),
('u003', 'ຄະນິດສາດ', 'f001', '2021-04-15', 'ບັນຈຸ'),
('u004', 'ຄະນິດສາດ', 'f001', '2021-04-15', 'ບັນຈຸ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_activity`
--
ALTER TABLE `tb_activity`
  ADD PRIMARY KEY (`acti_id`),
  ADD KEY `typeAct_id` (`typeAct_id`);

--
-- Indexes for table `tb_activity_detail`
--
ALTER TABLE `tb_activity_detail`
  ADD KEY `acti_id` (`acti_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `tb_certificate`
--
ALTER TABLE `tb_certificate`
  ADD PRIMARY KEY (`certific_id`),
  ADD KEY `typeCerti_id` (`typeCerti_id`);

--
-- Indexes for table `tb_certificate_detail`
--
ALTER TABLE `tb_certificate_detail`
  ADD KEY `member_id` (`member_id`),
  ADD KEY `certific_id` (`certific_id`);

--
-- Indexes for table `tb_educationlevel`
--
ALTER TABLE `tb_educationlevel`
  ADD PRIMARY KEY (`level_id`);

--
-- Indexes for table `tb_foundation`
--
ALTER TABLE `tb_foundation`
  ADD PRIMARY KEY (`fund_id`);

--
-- Indexes for table `tb_member`
--
ALTER TABLE `tb_member`
  ADD PRIMARY KEY (`member_id`),
  ADD KEY `sect_id` (`sect_id`),
  ADD KEY `typemember_id` (`typemember_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indexes for table `tb_move`
--
ALTER TABLE `tb_move`
  ADD PRIMARY KEY (`move_id`);

--
-- Indexes for table `tb_move_detail`
--
ALTER TABLE `tb_move_detail`
  ADD PRIMARY KEY (`move_NO`),
  ADD KEY `move_id` (`move_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `tb_receive_detail`
--
ALTER TABLE `tb_receive_detail`
  ADD KEY `member_id` (`member_id`),
  ADD KEY `tb_receive_detail_ibfk_2` (`receive_id`);

--
-- Indexes for table `tb_receive_money`
--
ALTER TABLE `tb_receive_money`
  ADD PRIMARY KEY (`receive_id`),
  ADD KEY `fund_id` (`fund_id`);

--
-- Indexes for table `tb_retirement`
--
ALTER TABLE `tb_retirement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `tb_section`
--
ALTER TABLE `tb_section`
  ADD PRIMARY KEY (`sect_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `tb_typeactivity`
--
ALTER TABLE `tb_typeactivity`
  ADD PRIMARY KEY (`typeAct_id`);

--
-- Indexes for table `tb_typecertificate`
--
ALTER TABLE `tb_typecertificate`
  ADD PRIMARY KEY (`typeCerti_id`);

--
-- Indexes for table `tb_typemember`
--
ALTER TABLE `tb_typemember`
  ADD PRIMARY KEY (`typemember_id`);

--
-- Indexes for table `tb_unit`
--
ALTER TABLE `tb_unit`
  ADD PRIMARY KEY (`unit_id`),
  ADD KEY `fund_id` (`fund_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_move_detail`
--
ALTER TABLE `tb_move_detail`
  MODIFY `move_NO` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_retirement`
--
ALTER TABLE `tb_retirement`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_activity`
--
ALTER TABLE `tb_activity`
  ADD CONSTRAINT `tb_activity_ibfk_1` FOREIGN KEY (`typeAct_id`) REFERENCES `tb_typeactivity` (`typeAct_id`);

--
-- Constraints for table `tb_activity_detail`
--
ALTER TABLE `tb_activity_detail`
  ADD CONSTRAINT `tb_activity_detail_ibfk_1` FOREIGN KEY (`acti_id`) REFERENCES `tb_activity` (`acti_id`),
  ADD CONSTRAINT `tb_activity_detail_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`);

--
-- Constraints for table `tb_certificate`
--
ALTER TABLE `tb_certificate`
  ADD CONSTRAINT `tb_certificate_ibfk_1` FOREIGN KEY (`typeCerti_id`) REFERENCES `tb_typecertificate` (`typeCerti_id`);

--
-- Constraints for table `tb_certificate_detail`
--
ALTER TABLE `tb_certificate_detail`
  ADD CONSTRAINT `tb_certificate_detail_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  ADD CONSTRAINT `tb_certificate_detail_ibfk_2` FOREIGN KEY (`certific_id`) REFERENCES `tb_certificate` (`certific_id`);

--
-- Constraints for table `tb_member`
--
ALTER TABLE `tb_member`
  ADD CONSTRAINT `tb_member_ibfk_1` FOREIGN KEY (`sect_id`) REFERENCES `tb_section` (`sect_id`),
  ADD CONSTRAINT `tb_member_ibfk_2` FOREIGN KEY (`typemember_id`) REFERENCES `tb_typemember` (`typemember_id`),
  ADD CONSTRAINT `tb_member_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `tb_educationlevel` (`level_id`);

--
-- Constraints for table `tb_move_detail`
--
ALTER TABLE `tb_move_detail`
  ADD CONSTRAINT `tb_move_detail_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `tb_move` (`move_id`),
  ADD CONSTRAINT `tb_move_detail_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`);

--
-- Constraints for table `tb_receive_detail`
--
ALTER TABLE `tb_receive_detail`
  ADD CONSTRAINT `tb_receive_detail_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  ADD CONSTRAINT `tb_receive_detail_ibfk_2` FOREIGN KEY (`receive_id`) REFERENCES `tb_receive_money` (`receive_id`);

--
-- Constraints for table `tb_receive_money`
--
ALTER TABLE `tb_receive_money`
  ADD CONSTRAINT `tb_receive_money_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `tb_foundation` (`fund_id`);

--
-- Constraints for table `tb_retirement`
--
ALTER TABLE `tb_retirement`
  ADD CONSTRAINT `tb_retirement_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`);

--
-- Constraints for table `tb_section`
--
ALTER TABLE `tb_section`
  ADD CONSTRAINT `tb_section_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `tb_unit` (`unit_id`);

--
-- Constraints for table `tb_unit`
--
ALTER TABLE `tb_unit`
  ADD CONSTRAINT `tb_unit_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `tb_foundation` (`fund_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
