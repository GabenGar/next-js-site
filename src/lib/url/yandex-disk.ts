import { IS_DEVELOPMENT, SITE_ORIGIN_URL } from "#environment/derived";

const YANDEX_DISK_ORIGIN = new URL("https://downloader.disk.yandex.ru/");

export class YandexDiskUrl extends URL {
  constructor(storageURL: string | URL) {
    super(storageURL, YANDEX_DISK_ORIGIN);
    this.host = YANDEX_DISK_ORIGIN.host;
    this.pathname = this.pathname.replace("/storage/yandex-disk", "/disk");
  }

  toStorageURL() {
    const storageURL = new URL(this.toString());

    // no https in development
    if (IS_DEVELOPMENT) {
      storageURL.protocol = SITE_ORIGIN_URL.protocol;
    }

    storageURL.host = SITE_ORIGIN_URL.host;
    storageURL.pathname = storageURL.pathname.replace(
      "/disk",
      "/storage/yandex-disk"
    );

    return storageURL;
  }
}
