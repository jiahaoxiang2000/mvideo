#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <mpv/client.h>

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    mpv_handle *mpv;
    QWidget *videoContainer;
    
    void initializeMpv();
};

#endif // MAINWINDOW_H
