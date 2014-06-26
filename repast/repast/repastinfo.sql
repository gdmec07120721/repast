-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 26 日 08:17
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `repastinfo`
--

-- --------------------------------------------------------

--
-- 表的结构 `bsdb`
--

CREATE TABLE IF NOT EXISTS `bsdb` (
  `idbsdb` int(10) NOT NULL AUTO_INCREMENT,
  `bsname` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `room` int(45) DEFAULT NULL,
  `num` int(45) DEFAULT NULL,
  `roomnum` int(45) DEFAULT NULL,
  `hallnum` int(45) DEFAULT NULL,
  PRIMARY KEY (`idbsdb`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=118 ;

--
-- 转存表中的数据 `bsdb`
--

INSERT INTO `bsdb` (`idbsdb`, `bsname`, `password`, `room`, `num`, `roomnum`, `hallnum`) VALUES
(70, '枫阁餐厅', 'a', 30, 1, 9, 20),
(114, '李记牛杂', 'a', 30, 15, 1, 14),
(115, '天天饺子餐厅', 'a', 30, 0, 10, 20),
(116, '马莉餐厅', 'a', 30, 0, 10, 20),
(117, '绿的梦时尚酷饮', 'a', 30, 0, 10, 20);

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(45) NOT NULL AUTO_INCREMENT,
  `cocampany` varchar(100) DEFAULT NULL,
  `coname` varchar(100) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `assess` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `cocampany`, `coname`, `comment`, `date`, `assess`) VALUES
(1, 'haha', 'hah', 'haa', 'aa', 'aa'),
(2, '枫阁餐厅', 'x', '水果色干哥哥', '2014年5月19日下午7:42:42', '很好'),
(3, '枫阁餐厅', 'x', '这里的东西好好吃啊啊啊啊啊啊啊！！！！！！！！！！！', '2014年5月19日下午8:06:46', '很好'),
(4, '枫阁餐厅', 'x', '你好', '2014年5月19日下午8:11:03', '很好'),
(5, '枫阁餐厅', 'x', '还好吧', '2014年5月19日下午8:14:45', '一般'),
(6, '李记牛杂', 'x', '真心觉得不错', '2014年5月19日下午8:22:27', '很好'),
(7, '李记牛杂', 'x', '怎么回事', '2014年5月19日下午8:22:58', '很好'),
(8, '李记牛杂', 'x', '一一一', '2014年5月19日下午8:23:14', '很好'),
(9, '李记牛杂', 'x', '问么iaioajoi', '2014年5月19日下午8:23:25', '很好'),
(10, '李记牛杂', 'x', 'SFBA可能将那', '2014年5月19日下午8:23:31', '很好'),
(11, '李记牛杂', 'x', '哦哦', '2014年5月19日下午8:23:44', '很好'),
(12, '李记牛杂', 'x', '哦哦', '2014年5月19日下午8:23:53', '很好'),
(13, '李记牛杂', 'x', '哦哦', '2014年5月19日下午8:23:59', '很好'),
(14, '天天饺子餐厅', 'x', '斯蒂芬金红啊是', '2014年5月20日上午8:33:14', '好'),
(15, '天天饺子餐厅', 'x', '斯蒂芬金红啊是', '2014年5月20日上午8:33:22', '好'),
(16, '天天饺子餐厅', 'x', '后v四', '2014年5月20日上午8:33:35', '好'),
(17, '天天饺子餐厅', 'x', '将好擦合肥', '2014年5月20日上午8:36:30', '很好'),
(18, '枫阁餐厅', '李晓冰', '唉！味道连我做的都不如', '2014年5月21日下午6:57:30', '很差'),
(19, '枫阁餐厅', '李晓冰', '唉！味道连我做的都不如', '2014年5月21日下午6:59:34', '一般'),
(20, '枫阁餐厅', '李晓冰', '唉！味道', '2014年5月21日下午6:59:45', '一般');

-- --------------------------------------------------------

--
-- 表的结构 `redb`
--

CREATE TABLE IF NOT EXISTS `redb` (
  `reid` int(45) NOT NULL AUTO_INCREMENT,
  `bsname` varchar(100) DEFAULT NULL,
  `ususer` varchar(100) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `num` int(45) DEFAULT NULL,
  PRIMARY KEY (`reid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

--
-- 转存表中的数据 `redb`
--

INSERT INTO `redb` (`reid`, `bsname`, `ususer`, `date`, `num`) VALUES
(30, '李记牛杂', 'x', '2014年5月18日下午5:47:15', 15),
(37, '枫阁餐厅', '李晓冰', '2014年5月21日下午4:34:24', 5),
(38, '枫阁餐厅', '李晓冰', '2014年5月21日下午4:35:33', 6),
(39, '枫阁餐厅', 'x', '2014年5月21日下午4:35:37', 6),
(40, '枫阁餐厅', 'x', '2014年5月21日下午4:36:24', 7),
(41, '枫阁餐厅', '李晓冰', '2014年5月21日下午4:36:56', 7),
(42, '枫阁餐厅', 'x', '2014年5月21日下午4:37:00', 8),
(43, '枫阁餐厅', '李晓冰', '2014年5月21日下午4:50:46', 9),
(44, '枫阁餐厅', 'x', '2014年5月21日下午4:52:56', 10),
(45, '枫阁餐厅', 'x', '2014年5月21日下午4:53:08', 11),
(46, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:24:36', 111),
(47, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:25:07', 1111),
(48, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:28:35', 1112),
(49, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:34:06', 0),
(50, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:34:56', 1),
(51, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:36:27', 2),
(52, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:39:43', 3),
(53, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:54:56', 4),
(54, '枫阁餐厅', '李晓冰', '2014年5月21日下午6:55:57', 1),
(55, '枫阁餐厅', '李晓冰', '2014年5月23日上午9:53:00', 1);

-- --------------------------------------------------------

--
-- 表的结构 `usdb`
--

CREATE TABLE IF NOT EXISTS `usdb` (
  `idusdb` int(10) NOT NULL AUTO_INCREMENT,
  `ususer` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `usnum` int(45) DEFAULT NULL,
  `uscampany` varchar(100) DEFAULT NULL,
  `usdate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusdb`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `usdb`
--

INSERT INTO `usdb` (`idusdb`, `ususer`, `password`, `usnum`, `uscampany`, `usdate`) VALUES
(15, 'b', 'b', 30, '枫阁餐厅', '2014年5月18日下午5:23:52'),
(16, '李晓冰', 'a', 1, '枫阁餐厅', '2014年5月23日上午9:53:00'),
(17, '张三', 'a', NULL, NULL, NULL),
(18, '李四', 'a', NULL, NULL, NULL),
(19, '王五', 'a', NULL, NULL, NULL),
(20, 'x', 'x', 11, '枫阁餐厅', '2014年5月21日下午4:53:08');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
