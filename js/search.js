  document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      var searchInput = document.getElementById("search-input");
      if (searchInput === document.activeElement) {
        //khi nhấn enter và focus input search sẽ chạy vào đây chặn enter
        event.preventDefault();
      }
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("search-input");
    var searchResults = document.getElementById("search-results");
    var maxResults = 9;
    const selectors = [
      //Phần 2. Danh mục (file)
      ".search-content-login",".search-content-building_list", ".search-content-room_list",".search-content-rate_room_type", ".search-content-room_rate_list",
      "#login", "#building_list", "#floor_list", "#direction_list", "#equipment_list", "#room_type", "#room_list", "#conference_list", "#rate_room_type", "#room_rate_list", "#discount_list", "#service_group_list", "#service_group_detail", "#user_group", "#usesr_access", "#shift_list", "#nationality", "#world_city", "#agent_list", "#area_list", "#guest_list", "#confirm_booking", "#purpose_list", "#airline_list", "#source_booking", "#promotion_list", "#billaddress_group", "#payment_type", "#card_type", "#reason_cancel", "#reason_locked", "#reason_maintenance" 
      //Phần 3. Kinh doanh (sale)
      ,"#availability", "#customer", "#reservation", "#room_allotment", "#sales", "#post_ohter_service", "#copy_booking", "#membership"    
      //Phần 4. Lễ tân (reception)
      ,"#reception", "#room_chart", "#room_assigment", "#checkin", "#type_guest", "#type_guest_reservation", "#type_guest_walkin", "#type_guest_by_machine", "#type_guest_checked_in", "#transfer", "#room_plan", "#job_evening", "#checkout", "#function_checkout", "#move_folio", "#admustment_folio", "#print_vat", "#print_vat_detail", "#exchange_currency", "#log_book", "#room_setup", "#view_late_checkout", "#budget_plan", "#transfer_to_group", "#charge_late_checkin", "#charge_noshow_booking", "#telephone_list", "#sethouseuse", "#re_checkin", "#re_checkin_room", "#re_checkin_folio"
      //Phần 5. Buồng phòng (HK)
      ,"#house_keeping", "#set_dirty", "#set_cleaning", "#Set_Un_cleaned", "#set_cleaned", "#set_maintenance", "#set_locked", "#laundry_type", "#laundry_rate", "#post_guest_charge_laudry", "#post_gest_charge_minibar", "#materials_list", "#post_materials_for_room", "#check_room_expected_arrivals", "#lost_found"
      //Phần 6. Báo cáo (Reports)
      ,"#report", "#reservation_report", "#reception_report", "#house_keeping_report", "#auditor", "#front_cashier", "#marketing_report", "#night_audit", "#gm_report", "#fb_report"
      //Phần 7. Hệ thống (System)
      ,"#system", "#change_language", "#change_password", "#log_history", "#authority_group", "#rate_exchange", "#log_out", "#others"
      //Phần 8. Câu hỏi thường gặp (Questions)
      ,"#questions", "#id5", "#id6", "#id7", "#id8", "#id9", "#id10", "#id11", "#hddt_questions", "#job_evening_questions", "#log_book_questions", "#other_service_questions", "#recheckin_questions", "#room_rate_list_questions", "#sethouseuse_questions", "#Telephone-List", "#Transfer", "#Transfer-Fit", "#Voucher", "#UndoCheckIn", "#FixCheckInPrice", "#ExtendCheckOut", "#RecheckInGuest", "#charge_cancel_noshow", "#charge_late_checkin_questions", "#checkin_questions", "#checkin_a", "#checkin_b", "#checkout_guest", "#commissions", "#exchange_currency_questions", "#find_guest", "#update_undo_noshow", "#update_noshow", "#undo_noshow", "#room_rate_list_from_to"
      //Phần 9. Hướng dẫn tạo thẻ ăn sáng
      ,"#breakfast"
    ];
    searchInput.addEventListener("keyup", function() {
      reset(); //reset id 
      var query = searchInput.value.toLowerCase();

      if (query.length == 0) {
        selectors.forEach(function(selector) {
          var elements = document.querySelectorAll(selector);
      
          elements.forEach(function(element) {
            clearHighlight(element);
        });
        });
        
        return;
      }
      clearSearchResults();

      

      var foundResults = 0;

      selectors.forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
    
        elements.forEach(function(element) {
          clearHighlight(element);
          var content = element.textContent.toLowerCase();
          if (content.includes(query) && foundResults < maxResults) {
            highlightMatchedElement(element, query);
            var resultContainer = createResultContainer(element, selector);
            searchResults.appendChild(resultContainer);
            foundResults++;
          }
        });
      });
    
      var showMoreText = document.createElement("div");
      if (!foundResults) {
        clearSearchResults();
        let noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "Không tìm thấy kết quả";
        noResultsMessage.classList.add("can-not-find");
        searchResults.appendChild(noResultsMessage);
      } else {
        if (foundResults < maxResults) {
        } else {
          showMoreText.textContent = "Hiển thị thêm";
          showMoreText.classList.add("show-more-text");
          searchResults.appendChild(showMoreText);
        }
      }
    
      showMoreText.addEventListener("click", function() {
        clearSearchResults();
    
        selectors.forEach(function(selector) {
          var elements = document.querySelectorAll(selector);
    
          elements.forEach(function(element) {
            clearHighlight(element);
            var content = element.textContent.toLowerCase();
            if (content.includes(query)) {
              highlightMatchedElement(element, query);
              var resultContainer = createResultContainer(element, selector);
              searchResults.appendChild(resultContainer);
            }
          });
        });
    
      });
    });
      function reset() {
      clearSearchResults();
    }

    function clearSearchResults() {
      searchResults.innerHTML = "";
    }

    function clearHighlight(element) {
      var highlightSpans = element.querySelectorAll("span.highlight");
      for (var i = 0; i < highlightSpans.length; i++) {
        var span = highlightSpans[i];
        var parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
      }
      element.classList.remove("highlighted");
    }

    function scrollElement(element, marginPercentage) {
      var offset = element.offsetTop + (element.offsetHeight * marginPercentage / 100);
      var scrollOffset = offset - (window.innerHeight * marginPercentage / 100);
      window.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
    
    function createResultContainer(element, selector) {
      var resultContainer = document.createElement("div");
      var dialogContent = document.createElement("div");
      var classToIdMap = {
        ".search-content-login": "login",
        ".search-content-building_list": "building_list",
        ".search-content-room_list": "room_list",
        ".search-content-rate_room_type": "rate_room_type",
        ".search-content-room_rate_list": "room_rate_list"
      };
      var id = classToIdMap[selector];
      var targetElement = null;
      if (id) {
        targetElement = document.getElementById(id);
      } else {
        targetElement = element;
      }
      if (targetElement) {
        dialogContent.appendChild(targetElement.cloneNode(true));
        resultContainer.appendChild(dialogContent);
        resultContainer.addEventListener("click", function() {
          scrollElement(targetElement, 15); //margin-top từ màn hình khi scroll
        });
      }
      resultContainer.classList.add('result-container');
      return resultContainer;
    }     

    // highlight
    function highlightMatchedElement(element, query) {
      var regex = new RegExp("(" + query + ")", "gi");
      var content = element.textContent;
      var matchFound = false;
      var highlightedContent = content.replace(regex, function(match, p1) {
        if (searchInput ===''){
          clearSearchResults();
        }
        matchFound = true;
        return '<span class="highlight">' + p1 + '</span>';
      });
      element.innerHTML = highlightedContent;
      element.classList.toggle("highlighted", matchFound);
    }  
        // End highlight

    // End 

  });

