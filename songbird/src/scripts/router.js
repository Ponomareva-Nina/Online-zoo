export class Router {
  constructor(container, startPage, gamePage, cataloguePage) {
    this.contentContainer = container;
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.cataloguePage = cataloguePage;
  }

  startRoute() {
    this.contentContainer.innerHTML = '';
    this.contentContainer.append(this.startPage);
  }

  gameRoute() {
    this.contentContainer.innerHTML = '';
    this.contentContainer.append(this.gamePage);
  }

  catalogueRoute() {
    this.contentContainer.innerHTML = '';
    this.contentContainer.append(this.cataloguePage);
  }
}

export function getHash() {
  return window.location.hash ? window.location.hash.slice(1) : 'start';
}
