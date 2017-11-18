---
layout: default
title: Default template
meta_description: "Modi: default template"
prev_page_title: Reference
prev_page_path: reference/
next_page_title: Actions template
next_page_path: templates/actions/
---

<link href="{{ site.baseurl }}/assets/css/templates/default/styles.min.css" rel="stylesheet">

<div markdown="1" class="minitabs">
  <ul class="tabnames">
    <li>Config</li>
    <li>Styles</li>
  </ul>
  <div markdown="1" class="tabcontent">
```js
var defaultTplConfig = {

  html: `
  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
    <div data-element="modal" data-small-width="500">
      <span data-element="close">×</span>
      <div data-element="content"></div>
    </div>
  </div>
  `,

  data: {
    class: 'modi',
    outsideClose: true
  }
}
```
  </div>
  <div markdown="1" class="tabcontent">
```scss
$overlay-bg: rgba(0, 0, 0, .6);
$modal-bg: #fff;
$close-bg: #ccc;

body[data-modal-visible='true'] {
  overflow: hidden;
}
.modi[data-element='overlay'] {
  align-items: center;
  background: $overlay-bg;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  padding: 0 15px 0 5px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;

  [data-element='modal'] {
    background-color: $modal-bg;
    box-sizing: border-box;
    margin: 20px auto;
    padding: 20px 30px;
    position: relative;
    width: 400px;
    z-index: 9999;

    [data-element='close'] {
      background-color: $close-bg;
      cursor: pointer;
      display: block;
      height: 20px;
      line-height: 20px;
      position: absolute;
      right: 10px;
      text-align: center;
      top: 10px;
      vertical-align: middle;
      width: 20px;
    }

    &[data-small-width-flag='true'] {
      width: 100%;
    }
  }

  &[data-small-height-flag='true'] {
    display: block;

    [data-element='modal'] {
      margin: 20px auto;
      position: relative;
    }
  }

  &[data-visible='false'] {
    display: none;
  }
}
```
  </div>
</div>

It’s the default template config, so it's not necessary to specify it during instantiation.

```js
var modal = new Modi({ content: 'Hi world!' });
```

<script style="text/javascript">
var modal = new Modi({ content: 'Hi world!' });
</script>
<button class="button" onclick="modal.show()">modal.show();</button>

Changing template settings:

```js
var modal = new Modi({
  content: 'Closing at clicking outside disabled. Close button to the rescue.',
  data: {
    outsideClose: false
  }
});
```

<script style="text/javascript">
var modalCustom = new Modi({
  content: 'Closing at clicking outside disabled. Close button to the rescue.',
  data: {
    outsideClose: false
  }
});
</script>
<button class="button" onclick="modalCustom.show()">modal.show()</button>

The modal will be scrollable when his height is larger than the window:

```js
var modal = new Modi({ content: 'Wild Lotsofinfo appeared!' });
```

<script style="text/javascript">
var modalLarge = new Modi({ content: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus enim lorem, fermentum id ante quis, semper dignissim est. Aenean eget neque in augue ornare mollis eu a magna. Nunc ut tristique nisl, consequat tincidunt augue. Sed porta porttitor orci ut lobortis. Nulla fermentum, arcu ac venenatis porttitor, arcu lectus porttitor est, ut congue velit risus eget ipsum. Sed imperdiet dolor nec lacus ultrices, eu dictum enim cursus. Proin vehicula augue turpis, sit amet rutrum orci tristique a. Sed pretium enim eu eleifend ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce a magna et lacus iaculis tincidunt. Sed et tellus fermentum, vulputate urna nec, efficitur ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </p> <p> Vivamus laoreet tincidunt lorem, vitae pellentesque mi tincidunt consequat. Phasellus quis imperdiet velit, nec feugiat leo. Sed ut neque quis leo tempor aliquet id sed sapien. Nulla quis leo nisi. Cras blandit egestas mi, at mollis nisl lacinia ut. Proin interdum vestibulum sapien, ac hendrerit elit commodo at. Fusce est purus, commodo ac lorem sit amet, imperdiet convallis nunc. Fusce at libero in nulla dignissim efficitur in eu dolor. Phasellus efficitur, erat nec lobortis viverra, dui elit tincidunt turpis, quis porta odio purus et nibh. Proin id lorem vel libero euismod vestibulum. Pellentesque a convallis ante. </p> <p> In enim tellus, bibendum at laoreet ut, pretium sed dolor. Phasellus quis molestie mauris. In eget nisl ac ipsum egestas semper. Proin lorem ex, laoreet a nisl at, vehicula pulvinar leo. Etiam aliquam sed libero quis laoreet. Nunc ornare, elit vel mattis pellentesque, quam nulla porta ante, non imperdiet metus nisl a quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla bibendum rhoncus eros, quis luctus ex molestie eget. Nulla porttitor purus vel fringilla lobortis. Suspendisse convallis sapien sit amet eros cursus aliquet. Cras eleifend, eros sollicitudin venenatis feugiat, ex est efficitur metus, nec semper mauris justo non ipsum. In posuere, risus ac blandit euismod, nisl leo fringilla nunc, at auctor velit nisi quis nibh. Aliquam volutpat mattis ipsum vel tincidunt. Donec maximus nibh in est pellentesque, at venenatis leo molestie. Nulla cursus at lectus ut sodales. Fusce consequat rutrum nisi, porttitor imperdiet dui auctor quis. </p> <p> In hac habitasse platea dictumst. Nunc efficitur sit amet massa sit amet pharetra. Nunc dapibus, neque ut feugiat euismod, orci turpis bibendum velit, ac viverra lorem augue a tellus. Sed gravida diam at sapien malesuada tempor a id metus. Pellentesque rutrum lacinia erat quis molestie. Fusce lacinia, tellus sit amet feugiat pulvinar, sapien augue bibendum nulla, vitae sagittis felis lectus vel ligula. Morbi justo enim, auctor sit amet efficitur ac, varius a mi. Vivamus iaculis sem ac lacus pellentesque, eu dictum orci tristique. Duis porta vitae urna sit amet blandit. Quisque venenatis lacus suscipit turpis tempus, id ullamcorper sem tempus. Aenean vel tincidunt est. </p> <p> Phasellus in tellus quis justo finibus dapibus. Morbi mattis mauris turpis, at hendrerit arcu aliquam vel. Aliquam erat volutpat. Mauris venenatis luctus nunc eu luctus. Nullam ac arcu quis felis tincidunt rutrum et eu lacus. Aliquam erat volutpat. Vestibulum turpis ligula, dignissim sit amet hendrerit eget, aliquet eu nisi. In rhoncus erat sit amet sagittis dapibus. </p> <p> Praesent ac eros ut erat vestibulum rutrum quis a elit. Aliquam erat volutpat. Praesent gravida purus a metus iaculis faucibus. Aliquam vestibulum dolor non eros rhoncus, sit amet tristique leo porta. Etiam sit amet libero ac odio posuere fermentum sed ut mi. Morbi id bibendum arcu. Donec facilisis non tortor congue sollicitudin. Nullam porta molestie pellentesque. Nulla malesuada nibh id arcu posuere, non fringilla purus molestie. </p> <p> Cras quis mi nunc. In hac habitasse platea dictumst. Aliquam a commodo nisl. Fusce molestie, odio quis lobortis tincidunt, magna ligula finibus justo, ac vestibulum velit enim non eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec fringilla mollis nisi, in congue eros congue ac. Vestibulum ac aliquam odio. Pellentesque laoreet iaculis lacinia. </p> <p> Mauris vel sollicitudin ex. Fusce eu risus sed erat dignissim laoreet. Aliquam rhoncus faucibus viverra. Cras lobortis lorem vitae blandit bibendum. Duis mollis arcu ut interdum sodales. Quisque vulputate mi tincidunt magna fermentum, nec malesuada eros vestibulum. Aliquam dolor ex, dictum a congue id, accumsan ut mi. Ut diam ligula, tincidunt eu magna ut, luctus porta purus. Pellentesque mollis finibus arcu nec semper. Morbi sed lorem commodo nulla eleifend tristique. </p> <p> Quisque ac augue porttitor sem feugiat consequat quis a lacus. Nulla aliquam purus sit amet massa tempus, eu imperdiet magna aliquet. Pellentesque tincidunt dapibus lectus, vitae feugiat dolor ornare eu. Nam at commodo metus. Nulla ut accumsan mi. Donec porta molestie sapien eu pharetra. Sed ut volutpat tortor, nec accumsan metus. Cras ac felis magna. Praesent consequat sem a metus luctus sodales. Nunc varius lacinia tortor, ac malesuada urna convallis id. Ut malesuada eleifend diam, at lobortis lectus dignissim nec. Donec id dolor in tortor rutrum elementum eget in ante. Morbi purus nibh, finibus hendrerit est vel, volutpat pharetra metus. Proin mattis diam vel diam tempus viverra. Donec id nulla gravida, volutpat nunc nec, congue nisi. Aliquam erat volutpat. </p> <p> Vestibulum pretium eros sed nisl rhoncus, eget euismod dui gravida. Morbi consectetur mattis erat, ut condimentum tellus commodo sed. In volutpat erat eget quam ornare venenatis. Nunc quam metus, sodales et condimentum nec, porttitor a orci. Vivamus nec sodales nibh, ut porta eros. Vivamus eget gravida tellus. Ut laoreet ultricies mi in lacinia. Morbi ornare enim non mi porttitor ultrices dignissim ut quam. Nullam laoreet iaculis risus, et pharetra ex accumsan eu. </p>' });
</script>
<button class="button" onclick="modalLarge.show()">modal.show()</button>
