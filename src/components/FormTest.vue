<template>
  <main>
    <div class="container pre-onboard">
      <div class="columns">
        <div class="column is-4">
          <div class="card-container">
            CARD DETAIL
          </div>
        </div>
        <div class="column is-8">
          <div class="content-box">
            <p class="label">Refer Prospect</p>
            <div class="columns">
              <div class="column is-6">
                <fib-field
                  :type="isValid.title && isValid.title.type"
                  :message="isValid.title && isValid.title.message"
                  label="PREFERRED PRONOUN"
                >
                  <fib-select
                    :valueOptions="titleOptions"
                    @input="selectInputTitle"
                    placeholder="Mr."
                  />
                </fib-field>
              </div>
            </div>
            <div class="columns name">
              <div class="column is-6">
                <fib-field
                  :type="isValid.firstNameEn && isValid.firstNameEn.type"
                  :message="isValid.firstNameEn && isValid.firstNameEn.message"
                  label="NAME (IN ENGLISH)"
                >
                  <fib-input
                    @blur="onBlurCheck('firstNameEn')"
                    v-model="form.firstNameEn"
                    placeholder="First Name"
                  />
                </fib-field>
              </div>
              <div class="column is-6">
                <fib-field
                  :type="isValid.lastNameEn && isValid.lastNameEn.type"
                  :message="isValid.lastNameEn && isValid.lastNameEn.message"
                >
                  <fib-input
                    @blur="onBlurCheck('lastNameEn')"
                    v-model="form.lastNameEn"
                    placeholder="Last Name"
                  />
                </fib-field>
              </div>
            </div>
            <div class="columns name">
              <div class="column is-6">
                <fib-field
                  :type="isValid.firstNameTh && isValid.firstNameTh.type"
                  :message="isValid.firstNameTh && isValid.firstNameTh.message"
                  label="NAME (IN THAI)"
                >
                  <fib-input
                    @blur="onBlurCheck('firstNameTh')"
                    v-model="form.firstNameTh"
                    placeholder="First Name"
                  />
                </fib-field>
              </div>
              <div class="column is-6">
                <fib-field
                  :type="isValid.lastNameTh && isValid.lastNameTh.type"
                  :message="isValid.lastNameTh && isValid.lastNameTh.message"
                >
                  <fib-input
                    @blur="onBlurCheck('lastNameTh')"
                    v-model="form.lastNameTh"
                    placeholder="Last Name"
                  />
                </fib-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <div class="columns is-variable is-1">
                  <div class="column is-3 phone-disabled">
                    <fib-field
                      :type="isValid.phone && isValid.phone.type"
                      label="PHONE"
                    >
                      <fib-input :value="prefixPhone" disabled />
                    </fib-field>
                  </div>
                  <div class="column is-9 phone">
                    <fib-field
                      :type="isValid.phone && isValid.phone.type"
                      :message="isValid.phone && isValid.phone.message"
                    >
                      <fib-input
                        @blur="onBlurCheck('phone')"
                        @keypress.native="isValidNum($event)"
                        v-model="form.phone"
                        placeholder="000000000"
                      />
                    </fib-field>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <fib-field
                  :type="isValid.email && isValid.email.type"
                  :message="isValid.email && isValid.email.message"
                  label="E-MAIL ADDRESS"
                >
                  <fib-input
                    @blur="onBlurCheck('email')"
                    v-model="form.email"
                    type="email"
                    placeholder="user@email.com"
                    required
                  />
                </fib-field>
              </div>
            </div>
            <div class="columns check-confirm">
              <div class="column">
                <div class="field">
                  <fib-checkbox v-model="form.confirm">
                    I confirm that I have taken the consent from the person ....
                  </fib-checkbox>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <fib-button
                  @click="clickSubmit"
                  style="width: 100%"
                  type="is-info"
                >
                  REFER CONTACT
                </fib-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "FormValidate",
  data() {
    return {
      titleOptions: [
        {
          value: "Mr.",
          label: "Mr."
        },
        {
          value: "Mrs.",
          label: "Mrs."
        }
      ],
      form: {
        title: "",
        firstNameEn: "",
        lastNameEn: "",
        firstNameTh: "",
        lastNameTh: "",
        phone: "",
        email: "",
        confirm: false
      },
      rules: {
        title: [title => !!title || "Title is required"],
        firstNameEn: [
          name => !!name || "First name en is required",
          name => !!name[0].trim() || "Can not start with ' '",
          name =>
            name.length > 3 || "First name en must be more than 3 characters"
        ],
        lastNameEn: [
          name => !!name || "Last name en is required",
          name =>
            name.length > 3 || "Last name en must be more than 3 characters"
        ],
        firstNameTh: [name => !!name || "First name th is required"],
        lastNameTh: [name => !!name || "Last name th is required"],
        phone: [
          phone => !!phone || "Phone is required",
          phone => phone.length > 7 || "Phone must be more than 7 characters"
        ],
        email: [
          email => !!email || "Email is required",
          email =>
            email.includes("@") || "Please include an '@' in the email address."
        ]
      },
      prefixPhone: "+66",
      isValid: {},
      formValid: false
    };
  },
  methods: {
    checkAllValid(formObj, rulesObj) {
      if (!formObj || !rulesObj) return null;
      const form = formObj;
      const rules = rulesObj;
      const isValidObj = {};
      // looping form key object
      const keyArr = Object.keys(form);
      for (let i = 0; i < keyArr.length; i++) {
        // find key if exist in rules
        if (rules.hasOwnProperty(keyArr[i])) {
          // looping current rules key (array function)
          for (let j = 0; j < rules[keyArr[i]].length; j++) {
            // run function with value parameter
            // if true = success, string = error
            const runFunc = rules[keyArr[i]][j](form[keyArr[i]]);

            // assign isValid if success / error
            // when error break the loop
            if (typeof runFunc === "string") {
              if (isValidObj.hasOwnProperty(keyArr[i])) {
                isValidObj[keyArr[i]].valid = false;
                isValidObj[keyArr[i]].type = "is-danger";
                isValidObj[keyArr[i]].message = runFunc;
              } else {
                isValidObj[keyArr[i]] = {
                  valid: false,
                  type: "is-danger",
                  message: runFunc
                };
              }
              break;
            } else if (runFunc === true) {
              if (isValidObj.hasOwnProperty(keyArr[i])) {
                isValidObj[keyArr[i]].valid = true;
                isValidObj[keyArr[i]].type = "";
                isValidObj[keyArr[i]].message = "";
              } else {
                isValidObj[keyArr[i]] = {
                  valid: true,
                  type: "",
                  message: ""
                };
              }
            }
          }
        }
      }
      return isValidObj;
    },
    checkSingleValid(formObj, rulesObj, keyName) {
      if (!formObj || !rulesObj || !keyName) return null;
      const form = formObj;
      const rules = rulesObj;
      const selectedKey = keyName;
      const isValidObj = {};
      // Check form & rules key
      if (
        form.hasOwnProperty(selectedKey) &&
        rules.hasOwnProperty(selectedKey)
      ) {
        // looping selected rules key
        for (let i = 0; i < rules[selectedKey].length; i++) {
          // run function with value parameter
          // if true = success, string = error
          const runFunc = rules[selectedKey][i](form[selectedKey]);
          // assign isValid if success / error
          // when error break the loop
          if (typeof runFunc === "string") {
            if (isValidObj.hasOwnProperty(selectedKey)) {
              isValidObj[selectedKey].valid = false;
              isValidObj[selectedKey].type = "is-danger";
              isValidObj[selectedKey].message = runFunc;
            } else {
              isValidObj[selectedKey] = {
                valid: false,
                type: "is-danger",
                message: runFunc
              };
            }
            break;
          } else if (runFunc === true) {
            if (isValidObj.hasOwnProperty(selectedKey)) {
              isValidObj[selectedKey].valid = true;
              isValidObj[selectedKey].type = "";
              isValidObj[selectedKey].message = "";
            } else {
              isValidObj[selectedKey] = {
                valid: true,
                type: "",
                message: ""
              };
            }
          }
        } // end for loop
        return isValidObj;
      }
    },
    formValidity(validFormObj) {
      // Return form validity
      const isValidArr = Object.keys(validFormObj);
      let formValidity;
      for (let i = 0; i < isValidArr.length; i++) {
        if (!validFormObj[isValidArr[i]].valid) {
          formValidity = false;
          break;
        } else {
          formValidity = true;
        }
      }
      return formValidity;
    },
    onBlurCheck(type) {
      this.isValid = Object.assign(
        {},
        this.isValid,
        this.checkSingleValid(this.form, this.rules, type)
      );
    },
    clickSubmit() {
      // check all field valid
      this.isValid = Object.assign(
        {},
        this.checkAllValid(this.form, this.rules)
      );

      // Check form validity
      this.formValid = this.formValidity(this.isValid);
      // if valid
      if (this.formValid) {
        // eslint-disable-next-line no-console
        console.log("form valid");
      } else {
        // eslint-disable-next-line no-console
        console.log("no valid");
      }
    },
    isValidNum(e) {
      const charCode = e.which ? e.which : e.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        e.preventDefault();
      }
    },
    selectInputTitle(e) {
      if (!e) {
        this.form.title = "";
        this.onBlurCheck("title");
        return;
      }
      const { value } = e;
      this.form.title = value;
      this.onBlurCheck("title");
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  .pre-onboard {
    min-height: 100vh;
    padding: 16px;
    .content-box {
      background-color: #fff;
      width: 100%;
      border: solid 2px rgba(204, 204, 204, 0.5);
      padding: 13px 16px 24px 16px;
      .label {
        font-weight: 500;
        font-size: 1.1rem;
        margin-bottom: 16px;
      }
      .name {
        .column:last-child {
          margin-top: 24px;
        }
        @media only screen and (max-width: 768px) {
          .column:last-child {
            margin-top: 0;
          }
        }
      }
      .phone {
        margin-top: 24px;
      }
      @media only screen and (max-width: 768px) {
        .phone {
          margin-top: 0;
        }
      }
      .check-confirm {
        margin-top: 14px;
      }
      @media only screen and (max-width: 768px) {
        .check-confirm {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
main {
  .pre-onboard {
    .fib-card-plan:hover .fib-card-container {
      border: solid 2px rgba(204, 204, 204, 0.5);
    }
    .phone-disabled {
      .input {
        padding: 0 !important;
        text-align: center;
      }
    }
    .check-confirm {
      .b-checkbox.checkbox {
        .control-label {
          padding-left: 16px !important;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
