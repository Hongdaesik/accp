class Config {

  static const timeoutPublic = 20;
  static const timeoutMultipart = 600;
}

class InvalidStatusCodeException implements Exception {

  final int? statusCode;

  InvalidStatusCodeException( this.statusCode );

  @override
  String toString() {

    return "InvalidStatusCodeException. status code : $statusCode";
  }
}
