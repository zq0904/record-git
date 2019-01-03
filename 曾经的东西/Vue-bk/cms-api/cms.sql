/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50554
Source Host           : localhost:3306
Source Database       : cms

Target Server Type    : MYSQL
Target Server Version : 50554
File Encoding         : 65001

Date: 2017-11-23 17:59:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `create_time` bigint(20) NOT NULL,
  `modify_time` bigint(20) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '哈哈', '1511236562845', '1511236562845', '2', '2');
INSERT INTO `comments` VALUES ('2', '哈哈哈', '1511424843733', '1511424843733', '10', '9');
INSERT INTO `comments` VALUES ('3', '哈哈哈的撒看就等你撒的撒', '1511424874877', '1511424874877', '10', '9');
INSERT INTO `comments` VALUES ('4', '哈哈哈的撒看就等你撒的撒倒垃圾拿到接口两三困了就睡那贾凯里尼大的撒', '1511424879631', '1511424879631', '10', '9');
INSERT INTO `comments` VALUES ('5', '哈哈哈', '1511425814954', '1511425814954', '10', '9');
INSERT INTO `comments` VALUES ('6', '好，await', '1511425846320', '1511425846320', '10', '9');
INSERT INTO `comments` VALUES ('7', '你好啊', '1511426038736', '1511426038736', '6', '9');
INSERT INTO `comments` VALUES ('8', '嘿嘿', '1511426042605', '1511426042605', '6', '9');
INSERT INTO `comments` VALUES ('9', 'heihie', '1511427231930', '1511427231930', '2', '9');
INSERT INTO `comments` VALUES ('10', '第二篇的评论', '1511427255939', '1511427255939', '3', '9');

-- ----------------------------
-- Table structure for topics
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `modify_time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topics
-- ----------------------------
INSERT INTO `topics` VALUES ('2', '今天天气不错啊啊啊啊', '今日适合写代码，不容易出bug', '1', '2017-11-20 05:03:48', '2017-11-21');
INSERT INTO `topics` VALUES ('3', '今天天气不错', '话题内容，确实不错，挺好的。。。', '1', '2017-11-20 05:05:08', '2017-11-20');
INSERT INTO `topics` VALUES ('4', '今天天气不错', '话题内容，确实不错，挺好的。。。', '1', '2017-11-20 05:06:14', '2017-11-20');
INSERT INTO `topics` VALUES ('5', '测试', '测试内容', '1', '2017-11-20 05:09:18', '2017-11-20');
INSERT INTO `topics` VALUES ('6', '测试111', '测试内容111', '1', '2017-11-20 05:17:30', '2017-11-20');
INSERT INTO `topics` VALUES ('9', '测试内容', '但就是看你的就看三级对你撒娇你懂撒', '9', '2017-11-23 03:17:38', '2017-11-23');
INSERT INTO `topics` VALUES ('10', '今天天气不错', '适合出去玩儿哈哈哈，嗯，啊，\n\ndsad as的\nsa\n打算\nd萨\n的撒', '9', '2017-11-23 03:26:55', '2017-11-23');
INSERT INTO `topics` VALUES ('11', 'dsadsa', 'dsadsad', '9', '2017-11-23 05:20:52', '2017-11-23');
INSERT INTO `topics` VALUES ('12', 'dsadsad', 'dsadsa', '9', '2017-11-23 05:20:57', '2017-11-23');
INSERT INTO `topics` VALUES ('13', 'dsadsadas', 'dsadsa', '9', '2017-11-23 05:21:01', '2017-11-23');
INSERT INTO `topics` VALUES ('14', 'dsadsadas', 'dsadsad', '9', '2017-11-23 05:21:10', '2017-11-23');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `modify_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'zs@zs.com', '14e1b600b1fd579f47433b88e8d85291', 'zs@zs.com', '战三', 'default-avatar.png', '\0', '2017-11-20 03:43:11', '2017-11-20 03:43:11');
INSERT INTO `users` VALUES ('2', 'zs1@zs.com', '14e1b600b1fd579f47433b88e8d85291', 'zs1@zs.com', '战三1', 'default-avatar.png', '\0', '2017-11-20 03:45:31', '2017-11-20 03:45:31');
INSERT INTO `users` VALUES ('3', 'zs2@zs.com', '14e1b600b1fd579f47433b88e8d85291', 'zs2@zs.com', '战三2', 'default-avatar.png', '\0', '2017-11-20 03:47:14', '2017-11-20 03:47:14');
INSERT INTO `users` VALUES ('4', 'zs3@zs.com', '14e1b600b1fd579f47433b88e8d85291', 'zs3@zs.com', '战三3', 'default-avatar.png', '\0', '2017-11-20 03:48:59', '2017-11-20 03:48:59');
INSERT INTO `users` VALUES ('5', 'zs4@zs.com', '14e1b600b1fd579f47433b88e8d85291', 'zs4@zs.com', '战三4', 'default-avatar.png', '\0', '2017-11-20 03:49:51', '2017-11-20 03:49:51');
INSERT INTO `users` VALUES ('6', 'aaa@dsa.com', '14e1b600b1fd579f47433b88e8d85291', 'aaa@dsa.com', 'undefined', 'default-avatar.png', '\0', '2017-11-21 02:03:30', '2017-11-21 02:03:30');
INSERT INTO `users` VALUES ('7', 'undefined', '8add17102ed680d0c84b756c9ea173dc', 'undefined', 'undefined', 'default-avatar.png', '\0', '2017-11-22 07:19:48', '2017-11-22 07:19:48');
INSERT INTO `users` VALUES ('8', 'abca@a.com', '14e1b600b1fd579f47433b88e8d85291', 'abca@a.com', 'abca', 'default-avatar.png', '\0', '2017-11-23 10:54:19', '2017-11-23 10:54:19');
INSERT INTO `users` VALUES ('9', 'lipengzhou@itcast.cn', '14e1b600b1fd579f47433b88e8d85291', 'lipengzhou@itcast.cn', 'lipengzhou', 'default-avatar.png', '\0', '2017-11-23 10:56:47', '2017-11-23 10:56:47');
