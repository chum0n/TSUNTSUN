# TSUNTSUN backend

## クリーンアーキテクチャ

- アプリケーションをレイヤーに分ける
- フレームワークやDBをアプリケーションの外側と位置付ける
- 依存関係は内側一方向のみ
- 外側のルールを、内側に持ち込んではいけない
- DIPを利用して依存ルールを守る
- Entities,Use casesにビジネスロジックを、それ以外にビジネスロジックを達成するためのロジックを書く

## API作成手順
1. インフラのrouter
2. 一個層が下のコントローラーの処理書いて呼び出す
3. そのためにもう一個下のusecaseのinteracterを使う
4. そのために同階層でリポジトリ層を定義する
5. コントローラー作るのにinteracterのリポジトリを考えないといけないから、interfaceのrepositoryを定義

## 参考
アーキテクチャ  
https://qiita.com/mIchino/items/b885de3396e3f77d8b37

[echoのQiita](https://qiita.com/pylor1n/items/36912a47c893ea5782cc)

[依存関係](https://qiita.com/fetaro/items/31b02b940ce9ec579baf)
