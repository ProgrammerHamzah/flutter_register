import 'package:flutter/material.dart';
import 'package:flutter_register/page/login_page.dart';
import 'package:flutter_register/page/register_page.dart';
import 'package:flutter_register/page/home_page.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Register App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(),
    );
  }
}
