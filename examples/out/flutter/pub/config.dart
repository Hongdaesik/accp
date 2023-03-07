
class Config {

  static const dev = 'http://localhost:8080';

  static const pub = 'http:..localhost';

  static const timeout = 20;

  static const statusSuccess = 200;
}

class InvalidStatusCodeException implements Exception {

  final int? statusCode;

  InvalidStatusCodeException( this.statusCode );

  @override
  String toString() {

    return "InvalidStatusCodeException. status code : $statusCode";
  }
}
