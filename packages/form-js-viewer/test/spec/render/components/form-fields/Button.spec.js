import { render } from '@testing-library/preact/pure';

import Button from '../../../../../src/render/components/form-fields/Button';

import { createFormContainer } from '../../../../TestHelper';

let container;


describe('Button', function() {

  beforeEach(function() {
    container = createFormContainer();
  });

  afterEach(function() {
    container.remove();
  });


  it('should render', function() {

    // when
    const { container } = createButton({
      field: {
        ...defaultField,
        action: 'reset',
        label: 'Reset'
      }
    });

    // then
    const formField = container.querySelector('.fjs-form-field');

    expect(formField).to.exist;
    expect(formField.classList.contains('fjs-form-field-button')).to.be.true;

    const button = container.querySelector('button');

    expect(button).to.exist;
    expect(button.type).to.equal('reset');
    expect(button.textContent).to.equal('Reset');
  });


  it('should render with default type (submit)', function() {

    // when
    const { container } = createButton();

    // then
    const button = container.querySelector('button');

    expect(button).to.exist;
    expect(button.type).to.equal('submit');
  });


  it('should render disabled', function() {

    // when
    const { container } = createButton({
      disabled: true
    });

    // then
    const button = container.querySelector('button');

    expect(button).to.exist;
    expect(button.disabled).to.be.true;
  });


  it('#create', function() {

    // when
    const field = Button.create();

    // then
    expect(field).to.contain({
      action: 'submit',
      label: 'Button',
      type: 'button'
    });

    expect(field._id).to.match(/button\d+/);
  });

});

// helpers //////////

const defaultField = {
  key: 'submit',
  label: 'Submit',
  type: 'button'
};

function createButton(options = {}) {
  const {
    disabled,
    field = defaultField
  } = options;

  return render(
    <Button
      disabled={ disabled }
      field={ field } />,
    {
      container: options.container || container.querySelector('.fjs-form')
    }
  );
}