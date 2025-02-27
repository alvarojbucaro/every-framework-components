import { Component, Host, h, Prop, EventEmitter, Event, State } from '@stencil/core';
import { CONST_ICON_XUACH_GLOBAL_DOPDOWN } from './constants';
import { ClickOutside } from 'stencil-click-outside';
@Component({
  tag: 'pr-dropdown',
  styleUrl: 'pr-dropdown.css',
  shadow: true,
})
export class XuachGlobalDropdown {
  @Prop() disabled: boolean = false;
  @Prop() value: string;
  @Prop() items: { id: string | number; text: string }[] = [
    { id: 0, text: 'option1' },
    { id: 1, text: 'option2' },
    { id: 2, text: 'option3' },
    { id: 3, text: 'option4' },
  ];
  @Prop({ attribute: 'error-message' }) errorMessage: string;
  @Prop() label: string;
  @Prop() icon: string;

  //state visibility menu
  @State() visibilityMenuDropdown: boolean = false;

  //Event to emit any action from of parent
  @Event() valueChange: EventEmitter<object>;

  //click outside component
  @ClickOutside()
  clickOutComponent() {
    this.visibilityMenuDropdown = false;
  }

  //emit event of Dropdown text
  onDropdownChangeValue(newValue: object) {
    this.changeVisibilityMenuDropdown();
    this.valueChange.emit(newValue);
  }

  //get style disabled
  getStyleDisabled() {
    return this.disabled ? 'disabled' : '';
  }
  //get style Label animation
  getStyleLabel() {
    if (!this.items) return 'control-label';
    return this.items
      .map(item => {
        return item.text;
      })
      .includes(this.value)
      ? 'control-label-animation'
      : 'control-label';
  }

  //get style error message
  getStyleErrorMessage() {
    return this.errorMessage && !this.disabled ? 'error' : '';
  }
  //get class of menu dropdown
  getClassDropdownMenu() {
    return this.visibilityMenuDropdown ? 'dropdown-menu' : 'dropdown-menu-hide';
  }
  //change status of visibility of dropdown menu
  changeVisibilityMenuDropdown() {
    this.visibilityMenuDropdown = !this.visibilityMenuDropdown;
  }

  //get value of select dropdown
  getValueOfSelectDropdown() {
    if (!this.items) return <span class="dropdown-text">{this.label}</span>;
    return this.items
      .map(item => {
        return item.text;
      })
      .includes(this.value) ? (
      <span class="dropdown-text">{this.value}</span>
    ) : (
      <span class="dropdown-text">{this.label}</span>
    );
  }
  //get opstions value
  getOptionsValue() {
    if (!this.items) {
      return (
        <li role="option" tabIndex={0} onClick={this.changeVisibilityMenuDropdown.bind(this)}>
          No hay opciones
        </li>
      );
    }
    return this.items.map(item => {
      return (
        <li role="option" tabindex={item.id} onClick={this.onDropdownChangeValue.bind(this, item)}>
          {item.text}
        </li>
      );
    });
  }

  render() {
    return (
      <Host>
        <div class="scroll-hide">
          <div class={this.getStyleErrorMessage() + ' dropdown ' + this.getStyleDisabled()}>
            <button disabled={this.disabled} class="form-control" onClick={this.changeVisibilityMenuDropdown.bind(this)}>
              <div class="dropdown-text">
                <img src={this.icon} class="imagen" />
                {this.getValueOfSelectDropdown()}
              </div>
              <img src={CONST_ICON_XUACH_GLOBAL_DOPDOWN['ARROW']} class="icon-image" />
            </button>
            <label class={this.getStyleLabel()}> {this.label}</label>
          </div>
          <span class="error-message">{this.errorMessage}</span>
          <ul class={this.getClassDropdownMenu()} role="listbox">
            {this.label}
            {this.getOptionsValue()}
          </ul>
        </div>
      </Host>
    );
  }
}
