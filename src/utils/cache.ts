//封装cache 实现对storage和session的统一接口封装
enum CacheType {
  Local,
  Session
}

class LocalCache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

const localCache = new LocalCache(CacheType.Local)

const sessionCache = new LocalCache(CacheType.Session)

export { localCache, sessionCache }
