#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <mpv/client.h>

class QSlider;
class QToolButton;
class QTimer;

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    mpv_handle *mpv;
    QWidget *videoContainer;
    QToolButton *playPauseButton;
    QSlider *seekSlider;
    QTimer *positionTimer;
    bool userSeeking;
    double mediaDuration;
    
    void initializeMpv();
    void updatePlayButton(bool isPlaying);

private slots:
    void openFile();
    void playPause();
    void updatePosition();
    void beginSeek();
    void endSeek();
};

#endif // MAINWINDOW_H
