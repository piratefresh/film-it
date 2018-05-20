<div className="mb-3">
  <button
    type="button"
    onClick={() => {
      this.setState(prevState => ({
        displaySocialInputs: !prevState.displaySocialInputs
      }));
    }}
    className="btn btn-light"
  >
    Add Social Network Links
  </button>
  <span className="text-muted">Optional</span>
</div>;
{
  socialInputs;
}
<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />;
