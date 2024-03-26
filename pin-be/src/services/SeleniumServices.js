import {Builder, Browser, until, By} from 'selenium-webdriver';

export default class SeleniumServices {
  constructor() {
    this.driver = null;
  }
  async initDriver(browser = Browser.CHROME) {
    this.driver = await new Builder().forBrowser(browser).build();
  }
  async getSiteByUrl(url) {
    await this.driver.get(url);
    await this.driver.wait(until.elementLocated(By.tagName('body')));
  }
  async scrollToBottom() {
    await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await this.driver.sleep(2000);
  }
  async getAllImages() {
    const images = await this.driver.findElements(By.css('img'));
    return await Promise.all([...images].map(image => image.getAttribute('src')));
  }
  async getTitle() {
    try {
      const title = await this.driver.findElement(By.css('h1'));
      console.log({title});
      return title;
    } catch (e) {
      console.error(e);
      return '';
    }
  }
  async initialize(url) {
    try {
      await this.initDriver(Browser.CHROME);
      await this.getSiteByUrl(url);
      await this.scrollToBottom();
      const [images, title] = await Promise.all([this.getAllImages(), this.getTitle()]);
      return {images, title};
    } catch (e) {
      console.log({e});
    } finally {
      await this.driver.quit();
    }
  }
}
