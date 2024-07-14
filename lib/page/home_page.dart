import 'package:flutter/material.dart';

void main() => runApp(const HomePage());

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HomeScreen App',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('HomeScreen Bar'),
        ),
        body: const Center(
          child: Text('HomeScreen'),
        ),
      ),
    );
  }
}
