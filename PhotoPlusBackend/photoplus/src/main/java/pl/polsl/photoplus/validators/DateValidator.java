package pl.polsl.photoplus.validators;

import pl.polsl.photoplus.annotations.validators.Date;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateValidator implements ConstraintValidator<Date, String> {

    @Override
    public boolean isValid(final String value, final ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            final java.util.Date date = sdf.parse(value);
            return value.equals(sdf.format(date));
        } catch (final ParseException e) {
            return false;
        }
    }
}
