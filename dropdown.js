function nbSelect(selector, options = {}) {
  const theme = options.theme || "default";
  const label = options.label || "Select";
  const submenus = options.submenus || {}; // predefined submenus

  $(selector).each(function () {
    const $select = $(this);
    if ($select.data("enhanced") === 1) return;

    const $wrapper = $(`
      <div class="nb-dropdown nb-theme-${theme}">
        <div class="nb-dropdown-toggle">
          <i class="fa-solid ${options.icon || 'fa-bars'}"></i> ${label}
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <ul class="nb-dropdown-menu"></ul>
      </div>
    `);

    const $menu = $wrapper.find(".nb-dropdown-menu");

    $select.find("option").each(function () {
      const $opt = $(this);
      const icon = $opt.data("icon") || "";
      const text = $opt.text();
      const value = $opt.val();
      const submenuItems = submenus[value];

      if (Array.isArray(submenuItems)) {
        const $li = $('<li class="nb-has-submenu"></li>');

        const $menuItem = $(`
          <div class="nb-menu-item">
            <div class="nb-left-part"><i class="fa-solid ${icon}"></i> ${text}</div>
            <i class="fa-solid fa-chevron-right nb-submenu-arrow"></i>
          </div>
        `);

        const $subMenu = $('<ul class="nb-submenu"></ul>');
        submenuItems.forEach((item) => {
          const $subLi = $(`<li><i class="fa-solid ${item.icon}"></i> ${item.text}</li>`);
          $subMenu.append($subLi);
        });

        $li.append($menuItem).append($subMenu);
        $menu.append($li);
      } else {
        const $li = $(`<li><i class="fa-solid ${icon}"></i> ${text}</li>`);
        $li.on("click", function () {
          $select.val(value).trigger("change");
          $(".nb-dropdown").removeClass("open");
        });
        $menu.append($li);
      }
    });

    $select.hide().after($wrapper);
    $select.data("enhanced", 1);
  });


  // Open submenu on hover
  $(document).on("mouseenter", ".nb-has-submenu", function () {
    $(this).find(".nb-submenu").stop(true, true).slideDown(150);
  }).on("mouseleave", ".nb-has-submenu", function () {
    $(this).find(".nb-submenu").stop(true, true).slideUp(150);
  });
}
