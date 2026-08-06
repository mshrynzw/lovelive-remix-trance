ここに音源ファイルを配置してください。

lib/tracks.ts の audioSrc で指定しているファイル名と一致させる必要があります:

  track-01.mp3
  track-02.mp3
  track-03.mp3
  track-04.mp3
  track-05.mp3
  track-06.mp3

ファイル名や曲数を変更する場合は、lib/tracks.ts の audioSrc も合わせて編集してください。
ファイルが存在しない間は、再生ボタンを押すとプレイヤーに音源未検出のメッセージが表示されます
（Track List カードの再生ボタン／下部の Music Player 両方で動作確認済みの仕組みです）。
