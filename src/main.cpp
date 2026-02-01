#include "MainWindow.h"
#include <QApplication>

int main(int argc, char *argv[]) {
  QApplication app(argc, argv);

  // Set application metadata
  app.setApplicationName("mvideo");
  app.setApplicationDisplayName("MVideo Editor - bilibili");
  app.setOrganizationName("isomoses");

  MainWindow window;
  window.show();

  return app.exec();
}
