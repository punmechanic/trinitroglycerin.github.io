// Search
const searchInput = document.getElementsByClassName('search-form-input')[0];
const searchWrap = document.getElementById('search-form-wrap')
const searchButton = document.getElementById('nav-search-btn');
searchButton.addEventListener('click', function () {
  searchWrap.classList.add('on');
  // We handle this here to ensure that we only ever focus the search input when we are revealing the search input.
  searchButton.addEventListener('transitionend', () => searchInput.focus(), { once: true });
});

searchInput.addEventListener('blur', () => {
  searchWrap.classList.remove('on');
});

// Mobile nav
const container = document.getElementById('container');
const navToggle = document.getElementById('main-nav-toggle');
navToggle.addEventListener('click', event => {
  event.stopPropagation();
  container.classList.toggle('mobile-nav-on');
});

const wrap = document.getElementById('wrap');
wrap.addEventListener('click', () => {
  container.classList.remove('mobile-nav-on');
});

// Share
function findShareBox(postId) {
  return document.getElementById(`article-share-box-${postId}`);
}

function createShareBox(title, url, postId) {
  const encodedURL = encodeURIComponent(url);
  const links = [
    { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedURL}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}` },
    { name: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodedURL}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer.php?u=${encodedURL}` }
  ];

  const linkContainer = document.createElement('div');
  linkContainer.classList.add('article-share-links');
  for (const { name, href } of links) {
    const anchor = document.createElement('a');
    anchor.title = name;
    anchor.href = href;
    anchor.classList.add(`article-share-${name.toLowerCase()}`);
    linkContainer.appendChild(anchor);
  }

  const input = document.createElement('input');
  input.classList.add('article-share-input');
  input.value = url;
  input.type = 'text';

  const box = document.createElement('div');
  box.id = `article-share-box-${postId}`;
  box.classList.add('article-share-box');
  box.appendChild(input);
  box.appendChild(linkContainer);
  box.addEventListener('click', e => {
    e.stopPropagation();
  });

  return box;
}

document.body.addEventListener('click', () => {
  for (const box of document.getElementsByClassName('article-share-box on')) {
    box.classList.remove('on');
  }
});

for (const link of document.getElementsByClassName('article-share-link')) {
  link.addEventListener('click', e => {
    e.stopPropagation();
    const postId = link.getAttribute('data-id');
    let node = findShareBox(postId);
    if (node === null) {
      const shareBox = createShareBox(
        link.getAttribute('data-title'),
        link.getAttribute('data-url'),
        postId
      );

      document.body.appendChild(shareBox);
      node = shareBox;
    }

    // Hide all other share boxes
    for (const el of document.getElementsByClassName('article-share-box on')) {
      el.classList.remove('on');
    }

    node.classList.add('on');
    node.style.top = `${link.offsetTop + 25}px`;
    node.style.left = `${link.offsetLeft}px`;
  });
}

// Caption
for (const article of document.getElementsByClassName('article-entry')) {
  for (const img of article.getElementsByTagName('img')) {
    if (img.parentNode?.tagName === 'A') {
      continue;
    }

    // TODO(trinitroglycerin): Write a plugin to do this and modify the layout to use that plugin tag.
    const alt = img.alt;
    const container = document.createElement('figure');
    // The parent node will be a <p>.
    img.parentNode.replaceWith(container);
    container.appendChild(img);
    if (alt) {
      // Alt text should not be included if it's already present in the content.
      img.alt = "";
      const node = document.createElement('figcaption');
      node.textContent = alt;
      container.appendChild(node);
    }
  }
}
