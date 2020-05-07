import {EVENT_TYPE} from "../../utils/constants.js";
import {
    colorSelectOptionTemplate,
    subwayLinesTemplate
} from "../../utils/templates.js";
import {subwayLineColorOptions} from "../../utils/defaultSubwayData.js";
import api from "../../api/index.js";
import Modal from "../../ui/Modal.js";

function AdminLine() {
    const $subwayLineList = document.querySelector("#subway-line-list");
    const $subwayLineNameInput = document.querySelector("#subway-line-name");
    const $subwayLineColorInput = document.querySelector("#subway-line-color");
    const $subwayLineFirstTime = document.querySelector("#first-time");
    const $subwayLineLastTime = document.querySelector("#last-time");
    const $subwayLineIntervalTime = document.querySelector("#interval-time");
    const $viewStartTime = document.querySelector("#view-start-time");
    const $viewEndTime = document.querySelector("#view-end-time");
    const $viewIntervalTime = document.querySelector("#view-interval-time");

    const $createSubwayLineButton = document.querySelector(
        "#subway-line-create-form #submit-button"
    );
    const subwayLineModal = new Modal();

    function addSubwayLineList(newSubwayLine) {
        $subwayLineList.insertAdjacentHTML(
            "beforeend",
            subwayLinesTemplate(newSubwayLine)
        );
    }

    const onCreateSubwayLine = event => {
        event.preventDefault();

        const newSubwayLine = {
            name: $subwayLineNameInput.value,
            color: $subwayLineColorInput.value,
            startTime: $subwayLineFirstTime.value,
            endTime: $subwayLineLastTime.value,
            intervalTime: $subwayLineIntervalTime.value
        };

        api.line.create(newSubwayLine).then(
            function (response) {
                if (response.status !== 201) {
                    alert("생성 불가!");
                    throw new Error("HTTP status " + response.status);
                }
                addSubwayLineList(newSubwayLine);
            }
        );

        subwayLineModal.toggle();
        $subwayLineNameInput.value = "";
        $subwayLineColorInput.value = "";
        $subwayLineFirstTime.value = "";
        $subwayLineLastTime.value = "";
        $subwayLineIntervalTime.value = "";
        $viewStartTime.innerHTML = newSubwayLine.startTime;
        $viewEndTime.innerHTML = newSubwayLine.endTime;
        $viewIntervalTime.innerHTML = newSubwayLine.intervalTime + "분"
    };

    const onDeleteSubwayLine = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-delete");
        if (isDeleteButton) {
            $target.closest(".subway-line-item").remove();
        }
    };

    const onUpdateSubwayLine = event => {
        const $target = event.target;
        const isUpdateButton = $target.classList.contains("mdi-pencil");
        if (isUpdateButton) {
            subwayLineModal.toggle();
        }
    };

    const onSelectSubwayLine = event => {
        const $target = event.target;
        const isSelectSubwayLine
            = $target.classList.contains("subway-line-item");
        if (isSelectSubwayLine) {
            api.line.get('/name/' + $target.innerText.trim()).then(line => {
                    $viewStartTime.innerHTML = line.startTime.slice(0, 5);
                    $viewEndTime.innerHTML = line.endTime.slice(0, 5);
                    $viewIntervalTime.innerHTML = line.intervalTime + "분";
                }
            )
        }
    };

    const onEditSubwayLine = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-pencil");
    };

    const initDefaultSubwayLines = () => {
        api.line.get().then(newSubwayLines => {
            newSubwayLines.forEach(newSubwayLine => {
                addSubwayLineList(newSubwayLine)
            })
        });
    };

    const initEventListeners = () => {
        $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onDeleteSubwayLine);
        $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onUpdateSubwayLine);
        $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onSelectSubwayLine);
        $createSubwayLineButton.addEventListener(
            EVENT_TYPE.CLICK,
            onCreateSubwayLine
        );
    };

    const onSelectColorHandler = event => {
        event.preventDefault();
        const $target = event.target;
        if ($target.classList.contains("color-select-option")) {
            document.querySelector("#subway-line-color").value =
                $target.dataset.color;
        }
    };

    const initCreateSubwayLineForm = () => {
        const $colorSelectContainer = document.querySelector(
            "#subway-line-color-select-container"
        );
        const colorSelectTemplate = subwayLineColorOptions
        .map((option, index) => colorSelectOptionTemplate(option, index))
        .join("");
        $colorSelectContainer.insertAdjacentHTML("beforeend",
            colorSelectTemplate);
        $colorSelectContainer.addEventListener(
            EVENT_TYPE.CLICK,
            onSelectColorHandler
        );
    };

    this.init = () => {
        initDefaultSubwayLines();
        initEventListeners();
        initCreateSubwayLineForm();
    };
}

const adminLine = new AdminLine();
adminLine.init();