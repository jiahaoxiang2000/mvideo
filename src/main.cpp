#include <QApplication>
#include "MainWindow.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    // Set application metadata
    app.setApplicationName("mvideo");
    app.setApplicationDisplayName("MVideo Editor");
    app.setOrganizationName("OpenCode");
    app.setOrganizationDomain("opencode.ai");

    MainWindow window;
    window.show();

    return app.exec();
}
