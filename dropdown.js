function nbSelect(selector, options = {}) {
  const label = options.label || "Select";
  const icon = options.icon || "fa-bars";
  const submenus = options.submenus || {};

  $(selector).each(function () {
    const $select = $(this);
    if ($select.data("enhanced") === 1) return;

    const $wrapper = $(`
      <div class="nb-dropdown">
        <div class="nb-dropdown-toggle">
          <i class="fa-solid ${icon}"></i> ${label}
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <ul class="nb-dropdown-menu"></ul>
      </div>
    `);

    const $toggle = $wrapper.find(".nb-dropdown-toggle");
    const $menu = $wrapper.find(".nb-dropdown-menu");

    // Custom style
    $toggle.css({
      backgroundColor: options.backgroundColor || "#fff",
      color: options.textColor || "#333",
      borderRadius: "10px",
      padding: "14px 18px",
      fontWeight: "500",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    });

    $select.find("option").each(function () {
      const $opt = $(this);
      const value = $opt.val();
      const icon = $opt.data("icon") || "";
      const text = $opt.text();
      const submenuItems = submenus[value];

      if (Array.isArray(submenuItems)) {
        const $li = $('<li class="nb-has-submenu"></li>');
        const $menuItem = $(`
          <div class="nb-menu-item">
            <div class="nb-left-part">
              <i class="fa-solid ${icon}"></i> ${text}
            </div>
            <i class="fa-solid fa-chevron-right nb-submenu-arrow"></i>
          </div>
        `);

        const $subMenu = $('<ul class="nb-submenu"></ul>');
        submenuItems.forEach((item) => {
          const $subLi = $(
            `<li><i class="fa-solid ${item.icon}"></i> ${item.text}</li>`
          );
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

    // Hover colors
    const hoverColor = options.hoverColor || "#f5f7fa";
    $menu
      .on("mouseenter", "li", function () {
        $(this).css("background-color", hoverColor);
      })
      .on("mouseleave", "li", function () {
        $(this).css("background-color", "");
      });

    // Add to DOM
    $select.hide().after($wrapper);
    $select.data("enhanced", 1);
  });

  // Open/close toggle
  $(document).on("click", ".nb-dropdown-toggle", function (e) {
    e.stopPropagation();
    const $dropdown = $(this).closest(".nb-dropdown");
    $(".nb-dropdown").not($dropdown).removeClass("open");
    $dropdown.toggleClass("open");
  });

  $(document).on("click", function () {
    $(".nb-dropdown").removeClass("open");
  });

  // Submenu logic
  $(document)
    .on("mouseenter", ".nb-has-submenu", function () {
      $(this).find(".nb-submenu").stop(true, true).slideDown(150);
    })
    .on("mouseleave", ".nb-has-submenu", function () {
      $(this).find(".nb-submenu").stop(true, true).slideUp(150);
    });

  // Dropdown toggle logic
  $(document).on("click", ".nb-dropdown-toggle", function (e) {
    e.stopPropagation();
    const $dropdown = $(this).closest(".nb-dropdown");
    $(".nb-dropdown").not($dropdown).removeClass("open");
    $dropdown.toggleClass("open");
  });

  $(document).on("click", function () {
    $(".nb-dropdown").removeClass("open");
  });
}
