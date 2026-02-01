#include "MainWindow.h"
#include <QWidget>
#include <QVBoxLayout>
#include <QDebug>
#include <mpv/render_gl.h>
#include <clocale>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    // Create a central widget and layout
    QWidget *centralWidget = new QWidget(this);
    setCentralWidget(centralWidget);
    QVBoxLayout *layout = new QVBoxLayout(centralWidget);
    layout->setContentsMargins(0, 0, 0, 0);

    // Create a container for the video
    videoContainer = new QWidget(this);
    videoContainer->setMinimumSize(640, 480);
    layout->addWidget(videoContainer);

    // Initialize MPV
    initializeMpv();
}

MainWindow::~MainWindow()
{
    if (mpv) {
        mpv_terminate_destroy(mpv);
    }
}

void MainWindow::initializeMpv()
{
    // MPV uses C locale
    std::setlocale(LC_NUMERIC, "C");

    mpv = mpv_create();
    if (!mpv) {
        qDebug() << "failed creating context";
        return;
    }

    // Enable default bindings
    mpv_set_option_string(mpv, "input-default-bindings", "yes");
    mpv_set_option_string(mpv, "input-vo-keyboard", "yes");
    
    // Set the window ID for MPV to render into
    int64_t wid = videoContainer->winId();
    mpv_set_property(mpv, "wid", MPV_FORMAT_INT64, &wid);

    // Initialize the MPV instance
    if (mpv_initialize(mpv) < 0) {
        qDebug() << "mpv init failed";
        return;
    }
    
    // Play a test video (optional, can be removed later)
    // const char *cmd[] = {"loadfile", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", NULL};
    // mpv_command(mpv, cmd);
}
